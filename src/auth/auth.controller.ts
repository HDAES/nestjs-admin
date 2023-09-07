import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as svgCaptcha from 'svg-captcha';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RedisService } from '../common/redis/redis.service';
import { CodeDto } from './dto/code.dto';
import { generateUniqueString } from '../utils/utils';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyDto } from './dto/verify.dto';
import { CustomError } from '../common/filter/custom.error';

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
  @ApiOperation({ summary: '创建验证码' })
  async createCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    const key = generateUniqueString(16);
    await this.redisService.setValue(key, captcha.text);
    return {
      verifyImage: captcha.data,
      verifyKey: key,
    };
  }

  @Public()
  @Post('verifyCaptcha')
  @ApiOperation({ summary: '验证码验证' })
  async verifyCaptcha(@Body() verifyDto: VerifyDto) {
    const code = await this.redisService.getValue(verifyDto.verifyKey);
    if (code) {
      if (code === verifyDto.code) {
        return true;
      } else {
        await this.redisService.remove(verifyDto.verifyKey);
        throw new CustomError('验证码错误，请重新获取', 201);
      }
    } else {
      throw new CustomError('验证码失效，请重新获取', 201);
    }
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
