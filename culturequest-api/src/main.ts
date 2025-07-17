import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CultureQuest API')
    .setDescription('API documentation for CultureQuest - Connecting Urban Youth with Cultural Heritage')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('artisans', 'Artisan management endpoints')
    .addTag('stories', 'Story management endpoints')
    .addTag('events', 'Event management endpoints')
    .addTag('analytics', 'Analytics endpoints')
    .addTag('moderation', 'Content moderation endpoints')
    .addTag('feedback', 'User feedback endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Add "/" route to welcome users
  app.getHttpAdapter().get('/', (req, res) => {
    res.send('Welcome to the CultureQuest backend application!');
  });

  // Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 