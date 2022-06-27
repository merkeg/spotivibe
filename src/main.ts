import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  const config = new DocumentBuilder().setTitle("Spotivibe").setDescription("API backend for Spotivibe").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);

  const redocOptions: RedocOptions = {};

  await RedocModule.setup("/api/docs", app, document, redocOptions);
  await app.listen(8080);
}
bootstrap();
