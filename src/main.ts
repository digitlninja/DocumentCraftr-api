import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { databaseProviders } from './db/database.providers';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DB
  databaseProviders.forEach((provider) => {
    try {
      console.log(`Connected to database: ${provider.name}`);
    } catch (error) {
      console.log('Database connection failed.', error);
    }
  });
  // Enable validation decorators
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(3001);
  console.log('Keenious API Running on:', 'http://localhost:3001');

}

bootstrap();
