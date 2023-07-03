import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum LoginTypeEnum {
  /**
   * # 账号登录
   */
  ACCOUNT,
  /**
   * # 手机号码
   */
  PHONE,
  /**
   * # 扫码登录
   */
  SCANCODE,
  /**
   * # 三方登录
   */
  THIRD,
}

export class LoginDto {
  @ApiProperty({
    description: '登录类型 0 - 账号登录 1 - 手机号 2 - 扫码 3 - 三方登录',
    default: LoginTypeEnum.ACCOUNT,
    enum: LoginTypeEnum,
  })
  type: LoginTypeEnum;

  @ApiPropertyOptional({
    description: '登录账号',
  })
  account: string;

  @ApiPropertyOptional({
    description: '密码',
  })
  password: string;
}
