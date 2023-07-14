import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export enum CreateTypeEnum {
  /**
   * # 账号
   */
  ACCOUNT,

  /**
   * # 手机号
   */
  PHONE,
}

@ApiTags('创建用户实体')
export class CreateUserDto {
  @ApiProperty({
    enum: CreateTypeEnum,
  })
  @IsNotEmpty({ message: '注册方式不能为空' })
  type: number;

  @ApiProperty({ description: '邮箱', required: false })
  email: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '账号' })
  account: string;
}
