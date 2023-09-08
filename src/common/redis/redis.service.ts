import { Injectable } from '@nestjs/common';
import Redis, { type Redis as RedisType } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly redisClient: RedisType;

  constructor(private readonly configService: ConfigService) {
    // @ts-ignore
    this.redisClient = new Redis({
      url: configService.get('redis.url'),
    });
  }

  /**
   * # 设置 内容
   * @param key key
   * @param value 内容
   * @param expire 秒
   */
  async setValue(key: string, value: string, expire?: number): Promise<void> {
    await this.redisClient.set(key, value);
    if (expire) await this.redisClient.pexpire(key, expire);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async setObject(key: string, obj: object, expire?: number): Promise<void> {
    const serializedObj = JSON.stringify(obj);
    await this.redisClient.set(key, serializedObj);
    if (expire) await this.redisClient.pexpire(key, expire);
  }

  async getObject<T>(key: string): Promise<T | null> {
    const serializedObj = await this.redisClient.get(key);
    if (serializedObj) {
      const obj = JSON.parse(serializedObj);
      return obj as T;
    }
    return null;
  }

  /**
   * # 根据key 删除值
   * @param key
   */
  async remove(key: string) {
    this.redisClient.del(key);
  }
}
