import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RedisService } from '../common/redis/redis.service';
import { CodeDto } from './dto/code.dto';
import { generateUniqueString } from '../utils/utils';

import { VerifyDto } from './dto/verify.dto';

@ApiTags('权限管理')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '登录' })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Public()
  @Get('createCaptcha')
  @ApiOperation({ summary: '生成图形验证码' })
  async createCaptcha() {
    return this.authService.createCaptcha();
  }

  @Public()
  @Post('verifyCaptcha')
  @ApiOperation({ summary: '验证码验证' })
  async verifyCaptcha(@Body() verifyDto: VerifyDto) {
    return this.authService.verifyCaptcha(verifyDto);
  }

  @Public()
  @Post('SMSCode')
  @ApiOperation({ summary: '获取短信验证码' })
  getSMSCode(@Body() verifyDto: VerifyDto) {
    return this.authService.getSMSCode(verifyDto);
  }

  @Public()
  @Get('getCode')
  @ApiOperation({ summary: '生成二维码信息' })
  async getCode() {
    const key = generateUniqueString(16);
    const code = new CodeDto();
    code.key = key;
    await this.redisService.setObject(key, code);
    return await this.redisService.getObject(key);
  }
}
