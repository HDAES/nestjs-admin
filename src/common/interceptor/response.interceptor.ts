import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Request, Response } from 'express';

interface data<T> {
  data: T;
}
@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: '成功',
          success: true,
        };
      }),
    );
  }
}
