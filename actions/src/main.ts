import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Staff APIs')
    .setDescription(
      `
    - Authentication: Bearer token
    - Pagination: /endpoint?take=50&page=2
    - Filter: ?filters={"status":"done","from":"2024-06-09T07:04:02.381Z","to":"2024-06-10T18:33:36.760Z"}
    `,
    )
    .setVersion('0.1') // Set the version of the API
    .addBearerAuth({
      name: 'authorization',
      in: 'header',
      description: 'Authentication token',
      type: 'apiKey',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(8888);
}
bootstrap();
