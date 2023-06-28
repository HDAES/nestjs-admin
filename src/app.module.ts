import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { DatabaseModule } from './utils/database.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from './utils/throttler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    ThrottlerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
