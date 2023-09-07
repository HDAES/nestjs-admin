import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: '验证码key',
  })
  verifyKey: string;

  @ApiPropertyOptional({
    description: '验证码图片',
  })
  verifyImage: string;

  @IsNotEmpty()
  @ApiPropertyOptional({
    description: '验证码code',
  })
  code: string;
}
