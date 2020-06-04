import { Module } from '@nestjs/common';
import { resourcesProviders } from './resources.providers';
import { DatabaseModule } from '../db/database.module';
import { ResourcesRepository } from './resources.repository';
import { ResourcesController } from './resources.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...resourcesProviders, ResourcesRepository],
  exports: [...resourcesProviders],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
