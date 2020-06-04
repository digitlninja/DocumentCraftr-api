import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

export const ResourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  body: String,
  documentTitle: String,
  documentId: {
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }
}, { timestamps: true });
