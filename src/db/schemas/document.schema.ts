import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: Date,
  updatedAt: Date,
});
