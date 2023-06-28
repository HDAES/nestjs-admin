import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * # 设置为公共接口
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

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
