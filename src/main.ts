import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingGlobalMiddleware } from './Middlewares/loguee-route';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('The ecommerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //* http://localhost:3000/api/

  app.use( LoggingGlobalMiddleware);
  app.useGlobalPipes (new ValidationPipe());
  await app.listen(3000);
  console.log("Server running on port 3000");
}
bootstrap();

