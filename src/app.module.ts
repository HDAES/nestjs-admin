import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './utils/database.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from './utils/throttler.module';
import { AuthModule } from './auth/auth.module';

import { AuthGuard } from './auth/auth.guard';
import { HttpFilter } from './common/filter/http.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    ThrottlerModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
