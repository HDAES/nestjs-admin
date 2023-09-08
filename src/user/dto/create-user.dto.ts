import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
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
  @PrimaryGeneratedColumn()
  id: number;

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

  @ApiProperty({ description: '昵称' })
  name: string;

  @ApiProperty({ description: '电话号码' })
  phone: string;
}
