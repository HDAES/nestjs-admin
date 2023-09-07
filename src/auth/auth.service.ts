import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginDto, LoginTypeEnum } from './dto/login.dto';
import { Crypto } from '../utils/crypto';
import { CustomError } from '../common/filter/custom.error';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    }
  }
}
