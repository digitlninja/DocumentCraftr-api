import * as mongoose from 'mongoose';

export const ResourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  body: String,
  documentName: String,
  createdAt: Date,
  updatedAt: Date,
});
