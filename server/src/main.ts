import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Use DocumentBuilder to create a new Swagger document configuration
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
    .addSecurity('JWT', {
      name: 'Authorization',
      bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'apiKey', // I`ve attempted type: 'apiKey' too
      in: 'Header',
    })
    .addBearerAuth({
      name: 'authorization',
      in: 'header',
      description: 'Authentication token',
      type: 'apiKey',
    })
    .build();


  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
