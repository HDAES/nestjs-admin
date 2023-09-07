import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly redisClient;

  constructor(private readonly configService: ConfigService) {
    // @ts-ignore
    this.redisClient = new Redis({
      url: configService.get('redis.url'),
    });
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async setObject(key: string, obj: object): Promise<void> {
    const serializedObj = JSON.stringify(obj);
    await this.redisClient.set(key, serializedObj);
  }

  async getObject<T>(key: string): Promise<T | null> {
    const serializedObj = await this.redisClient.get(key);
    if (serializedObj) {
      const obj = JSON.parse(serializedObj);
      return obj as T;
    }
    return null;
  }
}
