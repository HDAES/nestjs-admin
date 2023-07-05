import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Body,
  Query,
  ParseFilePipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { zip } from 'compressing';
import { Public } from '../auth/decorators/public.decorator';
import { join } from 'path';
import { DownloadDto } from './dto/download.dto';
import { UploadService } from './upload.service';
@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  private readonly baseUrl = '../../files/';

  constructor(private readonly uploadService: UploadService) {}

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
    const url = join(__dirname, this.baseUrl + `${query.path}`);
    res.download(url);
  }

  @Get('stream')
  @Public()
  @ApiOperation({ summary: '文件流下载' })
  async down(@Res() res: Response, @Query() query: DownloadDto) {
    const url = join(__dirname, this.baseUrl + `${query.path}`);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${query.name || query.path}`,
    );
    tarStream.pipe(res);
  }

  @Post('album/oss')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传文件到oss' })
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
  async uploadOss(
    @UploadedFile(new ParseFilePipe())
    file,
  ) {
    return await this.uploadService.putOssFile(
      file.path,
      join(__dirname, `../../${file.path}`),
    );
  }
}
