import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketTestService } from './socket-test.service';
import { RedisService } from '../common/redis/redis.service';
import { CodeDto } from '../auth/dto/code.dto';

@WebSocketGateway({ cors: true })
export class SocketTestGateway {
  constructor(
    private readonly socketTestService: SocketTestService,
    private readonly redisService: RedisService,
  ) {}

  @SubscribeMessage('socketTest')
  async socketTest(@MessageBody() data: any) {
    const codeInfo: CodeDto = await this.redisService.getObject(data.key);
    if (codeInfo.userId) {
      return {
        token: '123123',
      };
    } else {
      return codeInfo;
    }
  }
}
