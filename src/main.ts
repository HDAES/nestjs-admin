import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import Swagger from './utils/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  new Swagger(app);
  await app.listen(configService.get('http')['port'] || '3000');
}
bootstrap();
