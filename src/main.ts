import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger
  const config = configureSwaggerDocument();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swaggerui', app, documentFactory);

  await app.listen(3000);
}
bootstrap();

function configureSwaggerDocument() {
  return new DocumentBuilder()
    .setTitle("Course taxi")
    .setDescription("The Course Taxi API")
    .setVersion("1.0.0")
    .addTag("course-taxi")
    .build();
}