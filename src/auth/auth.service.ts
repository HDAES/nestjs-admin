import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto, LoginTypeEnum } from './dto/login.dto';
import { Crypto } from '../utils/crypto';
import { CustomError } from '../common/filter/custom.error';
import * as svgCaptcha from 'svg-captcha';
import { generateUniqueString } from '../utils/utils';
import { RedisService } from '../common/redis/redis.service';
import { VerifyDto } from './dto/verify.dto';
import { CreateTypeEnum, CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signIn(loginDto: LoginDto) {
    if (loginDto.type === LoginTypeEnum.ACCOUNT) {
      const user = await this.userService.findByAccount(loginDto.account);
      if (user?.password !== Crypto.encrypt(loginDto.password)) {
        throw new CustomError('账号或密码不正确', HttpStatus.CREATED);
      }
      const payload = { id: user.id, username: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else if (loginDto.type === LoginTypeEnum.PHONE) {
      // 手机号码登录
      if (loginDto.phone && loginDto.code) {
        const code = await this.redisService.getValue(
          loginDto.phone.toString(),
        );
        if (code === loginDto.code.toString()) {
          const user = await this.userService.findByPhone(loginDto.phone);
          const payload = { id: user.id, username: user.name };
          user.access_token = await this.jwtService.signAsync(payload);
          if (user) return user;

          // 注册
          const createBody = new CreateUserDto();
          createBody.type = CreateTypeEnum.PHONE;
          createBody.phone = loginDto.phone;
          return await this.userService.create(createBody);
        } else {
          throw new CustomError('验证码错误', 201);
        }
      } else {
        throw new CustomError('请输入电话号码和验证码', HttpStatus.CREATED);
      }
    }
  }

  /**
   * # 生成图形验证码
   */
  async createCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    const key = generateUniqueString(16);
    await this.redisService.setValue(key, captcha.text);
    console.log(key, captcha.text);
    return {
      verifyImage: captcha.data,
      verifyKey: key,
    };
  }

  /**
   * # 验证 验证码
   * @param verifyDto
   */
  async verifyCaptcha(verifyDto: VerifyDto) {
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

  async getSMSCode(verifyDto: VerifyDto) {
    if (await this.verifyCaptcha(verifyDto)) {
      await this.redisService.setValue(verifyDto.phone.toString(), '1234');
      return {
        code: '1234',
      };
    }
  }
}
