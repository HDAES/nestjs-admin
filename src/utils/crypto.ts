import * as CryptoJS from 'crypto-js';

export class Crypto {
  private static readonly key = '1005710179@qq.com';

  /**
   * # 加密
   * @param data
   */
  static encrypt(data: any) {
    const src = CryptoJS.enc.Utf8.parse(data);
    const iv = CryptoJS.enc.Utf8.parse(this.key);
    const encrypted = CryptoJS.AES.encrypt(src, iv, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString().toUpperCase();
  }

  /*
   * # 解密
   */
  static decrypt(data: any) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const src = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const iv = CryptoJS.enc.Utf8.parse(this.key);
    const decrypt = CryptoJS.AES.decrypt(src, iv, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

  static md5(data: string): string {
    return CryptoJS.MD5(data).toString();
  }
}
