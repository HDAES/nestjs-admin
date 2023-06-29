import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import Swagger from './utils/swagger';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  console.log(join(__dirname, 'files'));
  app.useStaticAssets('./files');

  const configService = app.get(ConfigService);
  new Swagger(app);
  await app.listen(configService.get('http.port') || '3000');
}
bootstrap();
