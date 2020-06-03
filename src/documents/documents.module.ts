import { Module } from '@nestjs/common';
import { documentsProviders } from './documents.providers';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repository';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentsController],
  providers: [...documentsProviders, DocumentsRepository],
})
export class DocumentsModule {}
