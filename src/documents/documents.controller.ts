import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post, Put,
  Query,
} from '@nestjs/common';
import { DocumentsRepository } from './documents.repository';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { Document } from './interfaces/Document';

@Controller('documents')
export class DocumentsController {
  constructor(@Inject('DocumentsRepository') private documentsRepository: DocumentsRepository) {
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return await this.documentsRepository.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Document> {
    const document = await this.documentsRepository.find(id);
    if(!document) {
      throw new BadRequestException();
    }
    return document;
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsRepository.create(createDocumentDto);
  }

  @Put()
  update(@Query('id') id: string, @Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsRepository.update(id, createDocumentDto);
  }
}
