import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Resource } from './interfaces/Resource';
import { Document } from '../documents/interfaces/Document';
import { DOCUMENT_MODEL, RESOURCE_MODEL } from '../constants';
import { CreateResourceDto } from './dtos/create-resource.dto';


@Injectable()
export class ResourcesRepository {
  constructor(
    @Inject(RESOURCE_MODEL) private resourceModel: Model<Resource>,
    @Inject(DOCUMENT_MODEL) private documentModel: Model<Document>,
  ) {
  }

  private async _linkResourceToDocument(document: Document, createdResource: Resource) {
    document.resources = [...document.resources, createdResource._id];
    await document.save();
  }

  async create(documentId: string, createResourceDto: CreateResourceDto): Promise<Resource> {
    const documentForResource = await this.documentModel.findById(documentId).exec();

    const createdResource = new this.resourceModel({...createResourceDto, documentTitle: documentForResource.title, documentId});
    await createdResource.save();
    this._linkResourceToDocument(documentForResource, createdResource);
    return createdResource;
  }

  async update(id: string, createResourceDto: CreateResourceDto): Promise<Resource> {
    // Returns the updated resource
    return this.resourceModel.findByIdAndUpdate(id, createResourceDto, { new: true }).exec();
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().exec();
  }

  async find(id: string): Promise<Resource> {
    const resource = this.resourceModel.findById(id).exec();
    if (!resource) {
      throw new BadRequestException();
    }
    return resource;
  }

  async delete(id: string): Promise<Resource> {
    return await this.resourceModel.findOneAndDelete({_id: id}).exec();
  }
}
