import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  ThrottlerModule as Throttler,
  ThrottlerGuard,
} from '@nestjs/throttler';
@Module({
  imports: [
    Throttler.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('THROTTLER_TTL', 60),
        limit: configService.get<number>('THROTTLER_LIMIT', 10),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}
