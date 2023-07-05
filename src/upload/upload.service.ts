import * as OSS from 'ali-oss';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private client: any;

  constructor(private readonly configService: ConfigService) {
    this.client = new OSS({
      accessKeyId: configService.get('oss.accessKeyId'),
      accessKeySecret: configService.get('oss.accessKeySecret'),
      region: configService.get('oss.region'),
      bucket: configService.get('oss.bucket'),
    });
  }

  // 上传文件到oss 并返回  图片oss 地址
  public async putOssFile(ossPath: string, localPath: string): Promise<string> {
    let res: any;
    try {
      res = await this.client.put(ossPath, localPath);
      // 将文件设置为公共可读
      await this.client.putACL(ossPath, 'public-read');

      return res.url;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
  /**
   * 获取文件的url
   * @param filePath
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
      console.log('get file signature failed: file name can not be empty');
      return null;
    }
    let result = '';
    try {
      result = this.client.signatureUrl(filePath, { expires: 36000 });
    } catch (err) {
      console.log(err);
    }
    return result;
  }
  /**
   * 上传文件大小校验
   * @param localPath
   * @param ossPath
   * @param size
   */
  public async validateFile(
    ossPath: string,
    localPath: string,
    size: number,
  ): Promise<string> {
    if (size > 5 * 1024 * 1024) {
      return;
    } else {
      return await this.putOssFile(ossPath, localPath);
    }
  }
}
