import * as fs from 'fs';
import { randomBytes } from 'crypto';
export const checkDirAndCreate = (filePath) => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

/**
 * 生成随机字符串
 * @param length
 */
export const generateUniqueString = (length: number): string => {
  const bytes = randomBytes(Math.ceil(length / 2));
  return bytes.toString('hex').slice(0, length);
};
