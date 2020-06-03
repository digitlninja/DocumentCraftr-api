import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Document } from './interfaces/Document';
import { DOCUMENT_MODEL } from '../constants';
import { CreateDocumentDto } from './dtos/create-document.dto';


@Injectable()
export class DocumentsRepository {
  constructor(@Inject(DOCUMENT_MODEL) private documentModel: Model<Document>) {
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async update(id: string, createDocumentDto: CreateDocumentDto): Promise<Document> {
    // Returns the updated document
    return this.documentModel.findByIdAndUpdate(id, createDocumentDto, { new: true });
  }

  async findAll(): Promise<Document[]> {
    return this.documentModel.find().exec();
  }

  async find(id: string): Promise<Document> {
    const document = this.documentModel.findById(id).exec();
    if(!document) {
      throw new BadRequestException();
    }
    return document;
  }
}
