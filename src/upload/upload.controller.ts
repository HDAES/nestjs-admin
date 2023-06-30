import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
  ParseFilePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { zip } from 'compressing';
import { Public } from '../auth/decorators/public.decorator';
import { join } from 'path';
import { DownloadDto } from './dto/download.dto';
@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  private readonly baseUrl = '../../files/';

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
}
