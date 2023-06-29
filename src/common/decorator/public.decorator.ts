import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * # 自定义请求头装饰器
 */
export const ReqDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);

export const ResDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response;
  },
);
