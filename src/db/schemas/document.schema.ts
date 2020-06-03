import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  title: String,
  body: String,
}, { timestamps: true });
