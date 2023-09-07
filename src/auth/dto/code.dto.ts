import { ApiProperty } from '@nestjs/swagger';
import { LoginTypeEnum } from './login.dto';
import { CreateDateColumn } from 'typeorm';
import dayjs from 'dayjs';
import { UserEntity } from '../../user/entities/user.entity';

export const StatusEnum = {
  PENDING: 'pending',
  ON: 'on',
  SUCCESSES: 'successes',
  FAIL: 'fail',
  LAPSE: 'lapse',
};

export class CodeDto {
  @ApiProperty({
    description: '二维码状态',
    default: StatusEnum.PENDING,
    enum: StatusEnum,
  })
  status: string;

  @ApiProperty({
    description: '二维码关键key',
  })
  key: string;

  @ApiProperty({
    description: '创建时间',
  })
  create_date: string;

  @ApiProperty({
    description: '扫码用户id',
  })
  userId: number;

  constructor() {
    this.status = StatusEnum.PENDING;
    this.create_date = new Date().toString();
  }
}
