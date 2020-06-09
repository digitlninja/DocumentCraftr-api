import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";

import {ResourcesRepository} from './resources.repository';
import {Resource} from './interfaces/Resource';
import {IdParams} from '../dtos/id-params.dto';
import {CreateResourceDto} from './dtos/create-resource.dto';
import {AWSService} from "../services/AWSService";
import {Document} from "../documents/interfaces/Document";

@Controller('documents/resources')
export class ResourcesController {
    constructor(
        @Inject('ResourcesRepository') private resourcesRepository: ResourcesRepository,
        @Inject('AWSService') private awsService: AWSService,
    ) {
    }

    @Get('/all')
    async findAll(): Promise<Resource[]> {
        return await this.resourcesRepository.findAll();
    }

    @Get(':id')
    async find(@Param() {id}: IdParams): Promise<Resource> {
        const resource = await this.resourcesRepository.find(id);
        if (!resource) {
            throw new BadRequestException();
        }
        return resource;
    }

    @Post(':documentId')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Param('documentId') documentId: string, @Body() createResourceDto: CreateResourceDto, @UploadedFile() file: any = ''): Promise<Document> {
        if (!file) {
            return this.resourcesRepository.create(documentId, createResourceDto);
        }
        const url = await this.awsService.uploadFile(file);
        return this.resourcesRepository.create(documentId, createResourceDto, url);
    }

    @Post(':documentId/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Param('documentId') documentId: string, @UploadedFile() file: Express.Multer.File): Promise<any> {
        return await this.awsService.uploadFile(file);
    }

    @Put(':id')
    async update(@Param() {id}: IdParams, @Body() createResourceDto: CreateResourceDto): Promise<Resource> {
        const updatedResource = id && await this.resourcesRepository.update(id, createResourceDto);
        if (!updatedResource) {
            throw new BadRequestException();
        }
        return this.resourcesRepository.update(id, createResourceDto);
    }

    @Delete(':id')
    async delete(@Param() {id}: IdParams): Promise<void> {
        const deletedResource = await this.resourcesRepository.delete(id);
        if (!deletedResource) {
            throw new BadRequestException();
        }
        // By default Nest will return 200 OK
    }

}
