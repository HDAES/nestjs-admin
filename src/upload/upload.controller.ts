import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Body,
  Query,
  UsePipes,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { Public } from '../auth/decorators/public.decorator';
import { join } from 'path';
import { DownloadDto } from './dto/download.dto';
@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  @Post('album')
  @Public()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: '文件',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  upload(
    @UploadedFile(new ParseFilePipe())
    file,
  ) {
    return file;
  }

  @Get('export')
  @Public()
  @ApiOperation({ summary: '文件下载' })
  downLoad(@Res() res: Response, @Query() query: DownloadDto) {
    const url = join(__dirname, `../files/${query.path}`);
    res.download(url);
  }
}
