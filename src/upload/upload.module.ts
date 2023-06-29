import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as dayjs from 'dayjs';
import { UploadController } from './upload.controller';
import { checkDirAndCreate } from '../utils/utils';
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const mimeType = file.mimetype.split('/')[1];
          let temp = 'other';
          image.includes(mimeType) ? (temp = 'image') : '';
          video.includes(mimeType) ? (temp = 'video') : '';
          audio.includes(mimeType) ? (temp = 'audio') : '';
          const filePath = `files/${temp}/${dayjs().format('YYYY-MM-DD')}`;
          checkDirAndCreate(filePath);
          return cb(null, `./${filePath}`);
        },
        filename: (
          req: Express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
