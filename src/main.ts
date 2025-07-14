import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  // Swagger configuration

  const configSwagger = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('API for managing tasks')
    .addBearerAuth() // Enable Bearer authentication
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, documentFactory);

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
