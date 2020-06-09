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

    // Link resource to document references (add a child ref)
    private async _linkResourceToDocument(document: Document, createdResource: Resource) {
        document.resources = [...document.resources, createdResource._id];
        await document.save();
    }

    async create(documentId: string, createResourceDto: CreateResourceDto, fileUrl?: string): Promise<Document> {
        const documentForResource = await this.documentModel.findById(documentId).exec();
        let dataToSave = {};

        // If no fileUrl is passed, this is a simple link resource (included in the DTO)
        if (!fileUrl) {
            dataToSave = {
                ...createResourceDto,
                documentTitle: documentForResource.title,
                documentId
            };
        } else {
            // If this is a file upload, add it as the resource body
            dataToSave = {
                ...createResourceDto,
                documentTitle: documentForResource.title,
                documentId,
                body: fileUrl
            }
        }
        const createdResource = new this.resourceModel(dataToSave);
        await createdResource.save();

        await this._linkResourceToDocument(documentForResource, createdResource);
        const updatedDocument = await this.documentModel.findById(documentId).populate('resources').exec();
        console.log({updatedDocument});
        return updatedDocument;
    }

    // Returns the updated resource
    async update(id: string, createResourceDto: CreateResourceDto): Promise<Resource> {
        return this.resourceModel.findByIdAndUpdate(id, createResourceDto, {new: true}).exec();
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
