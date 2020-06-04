import { Document as MongooseDocument } from 'mongoose';
import { ResourceType } from '../dtos/create-resource.dto';

export interface Resource extends MongooseDocument {
  readonly title: string,
  readonly type: ResourceType,
  readonly body: string,
  readonly documentTitle: string,
  readonly documentId: string,
  readonly createdAt: Date;
  readonly updatedAt: Date;
}