import { Module } from '@nestjs/common';
import { documentsProviders } from './documents.providers';

@Module({
  providers: [...documentsProviders],
  exports: [...documentsProviders],
})
export class DocumentsModule {}
