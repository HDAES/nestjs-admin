import { Module } from '@nestjs/common';
import { JwtModule as JWT } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
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
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
