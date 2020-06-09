import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Inject,
    Param,
    ParseBoolPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {DocumentsRepository} from './documents.repository';
import {CreateDocumentDto} from './dtos/create-document.dto';
import {Document} from './interfaces/Document';
import {IdParams} from '../dtos/id-params.dto';

@Controller('documents')
export class DocumentsController {
    constructor(@Inject('DocumentsRepository') private documentsRepository: DocumentsRepository) {
    }

    @Get()
    async findAll(): Promise<Document[]> {
        return await this.documentsRepository.findAll();
    }

    @Get(':id')
    async find(
        @Param() {id}: IdParams,
        @Query('includeResources', new DefaultValuePipe(true), ParseBoolPipe) includeResources: boolean,
    ): Promise<Document> {
        const document = await this.documentsRepository.find(id, includeResources);
        if (!document) {
            throw new BadRequestException();
        }
        return document;
    }

    @Post()
    async create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
        return await this.documentsRepository.create(createDocumentDto);
    }

    @Put(':id')
    async update(@Param() {id}: IdParams, @Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
        const updatedDocument = await this.documentsRepository.update(id, createDocumentDto);
        if (!updatedDocument) {
            throw new BadRequestException();
        }
        return updatedDocument;
    }

    @Delete(':id')
    async delete(@Param() {id}: IdParams): Promise<void> {
        const deleteDocument = await this.documentsRepository.delete(id);
        if (!deleteDocument) {
            throw new BadRequestException();
        }
    }
}
