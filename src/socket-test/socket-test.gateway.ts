import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketTestService } from './socket-test.service';

@WebSocketGateway({ cors: true })
export class SocketTestGateway {
  constructor(private readonly socketTestService: SocketTestService) {}

  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    return {
      msg1: '测试1',
      msg2: '测试2',
    };
  }
}
