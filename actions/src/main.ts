import mongoose from "mongoose"; 
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import path from "path";

async function bootstrap() {

  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDB connected (Actions/NestJS)");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //  CORS cho client
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  //  STATIC UPLOADS
  app.useStaticAssets(
    path.join(__dirname, "../uploads"),
    { prefix: "/uploads" }
  );

  //  SWAGGER
  const config = new DocumentBuilder()
    .setTitle("Staff APIs")
    .setDescription("API Docs")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT || 8888;
  await app.listen(port);

  console.log(`🚀 Actions API running on http://localhost:${port}`);
}

bootstrap();
