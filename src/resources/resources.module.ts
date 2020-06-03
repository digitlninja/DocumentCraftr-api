import { Module } from '@nestjs/common';
import { resourcesProviders } from './resources.providers';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...resourcesProviders],
  exports: [...resourcesProviders],
})
export class ResourcesModule {}
