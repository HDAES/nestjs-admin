import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateTypeEnum } from '../dto/create-user.dto';
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名' })
  name: string;

  @ApiProperty({ description: '账号 ' })
  @Column({ comment: '账号' })
  account: string;

  @Column({ select: false, comment: '密码' })
  password: string;

  @ApiProperty({ description: '用户角色 ' })
  @Column({ type: 'simple-array', comment: '用户角色' })
  roles: string[];

  @ApiProperty({ description: '返回token' })
  access_token: string;

  @ApiProperty({
    enum: CreateTypeEnum,
  })
  @IsNotEmpty({ message: '注册方式不能为空' })
  type: number;

  @ApiProperty({ description: '最后登录ip' })
  @Column({
    comment: '最后登录ip',
  })
  last_login_ip: string;

  @ApiProperty({ description: '最后登录时间' })
  @Column({
    comment: '最后登录时间',
    type: 'datetime',
    default: () => 'NOW()',
  })
  last_login_date: string;

  @ApiProperty({
    description: '创建时间',
  })
  @CreateDateColumn()
  create_date: string;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  update_date: string;
}
