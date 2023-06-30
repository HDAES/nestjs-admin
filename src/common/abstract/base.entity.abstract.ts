import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
export class BaseEntityAbstract {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '创建时间',
  })
  @CreateDateColumn()
  create_date: string;

  @ApiProperty({
    description: '更新时间',
  })
  @UpdateDateColumn({
    collation: '10',
  })
  update_date: string;
}
