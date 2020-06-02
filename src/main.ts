import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { databaseProviders } from './db/database.providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // DB
  databaseProviders.forEach((provider) => {
    try {
      console.log(`Connected to database: ${provider.name}`);
    } catch (error) {
      console.log('Database connection failed.', error);
    }
  });
}

bootstrap();
