import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestExceptionFilter } from './shared/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from './shared/filters/not-found-exception.filter';
import { InternalServerErrorExceptionFilter } from './shared/filters/internal-server-error-exception.filter';
import { DuplicateRecordExceptionFilter } from './shared/filters/duplicate-record-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('challenge-backend')
    .setDescription('API for FIAP Challenge Backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades que não estão no DTO.
    forbidNonWhitelisted: true, // lança um erro se propriedades desconhecidas forem passadas.
    transform: true, // transforma a payload para o tipo especificado no DTO.
  }));
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
    new DuplicateRecordExceptionFilter()
  );
  await app.listen(3000);
}
bootstrap();
