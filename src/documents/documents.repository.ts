import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Document } from './interfaces/Document';
import { DOCUMENT_MODEL } from '../constants';
import { CreateDocumentDto } from './dtos/create-document.dto';


@Injectable()
export class DocumentsRepository {
  constructor(@Inject(DOCUMENT_MODEL) private documentModel: Model<Document>) {
  }

  async findAll(): Promise<Document[]> {
    return this.documentModel.find();
  }

  async find(id: string, includeResources = true): Promise<Document> {
    const document = this.documentModel.findById(id);
    if (includeResources) {
      document.populate('resources');
    }
    if (!document) {
      throw new BadRequestException();
    }
    return document;
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async update(id: string, createDocumentDto: CreateDocumentDto): Promise<Document> {
    // Returns the updated document
    return this.documentModel.findByIdAndUpdate(id, createDocumentDto, { new: true });
  }

  async delete(id: string): Promise<Document> {
    return this.documentModel.findOneAndDelete({ _id: id });
  }
}
