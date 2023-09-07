import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RedisService } from '../common/redis/redis.service';
import { CodeDto } from './dto/code.dto';
import { generateUniqueString } from '../utils/utils';

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

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('getCode')
  async getCode(@Request() req) {
    const key = generateUniqueString(16);
    const code = new CodeDto();
    code.key = key;
    await this.redisService.setObject(key, code);
    return await this.redisService.getObject(key);
  }
}
