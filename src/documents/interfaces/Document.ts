import { Document as MongooseDocument } from 'mongoose';
import { Resource } from '../../resources/interfaces/Resource';

export interface Document extends MongooseDocument {
  readonly title: string;
  readonly body: string;
  resources: Resource[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}