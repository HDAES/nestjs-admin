import { Module } from '@nestjs/common';
import { SocketTestService } from './socket-test.service';
import { SocketTestGateway } from './socket-test.gateway';
import { RedisService } from '../common/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    SocketTestGateway,
    SocketTestService,
    ConfigService,
    RedisService,
  ],
})
export class SocketTestModule {}
