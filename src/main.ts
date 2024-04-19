import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //para capturar las excepciones de los microservicios y controlar errores
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(3000);

  logger.log(`Application is running on: ${envs.port}`);
}
bootstrap();
