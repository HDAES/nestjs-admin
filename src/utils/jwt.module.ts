import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { JwtModule as JWT } from '@nestjs/jwt';

@Module({
  imports: [
    JWT.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret_key', 'HADES'),
        signOptions: {
          expiresIn: configService.get<string | number>(
            'jwt.expires_in_time',
            '30d',
          ),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class JwtModule {}
