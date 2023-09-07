import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { QueryFailedError } from 'typeorm';
import { MyCustomError } from './custom.error';
@Catch(QueryFailedError, HttpException, MyCustomError)
export class HttpFilter<T> implements ExceptionFilter {
  catch(
    exception: QueryFailedError | HttpException | MyCustomError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (exception instanceof MyCustomError) {
      response.status(200).json({
        status: exception.code,
        message: exception.name,
      });
    }

    if (exception instanceof QueryFailedError) {
      response.status(500).json({
        message: exception.driverError,
        time: new Date().getTime(),
        success: false,
        status: 500,
      });
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        message:
          status === HttpStatus.BAD_REQUEST
            ? exception.getResponse()['message']
            : exception.message,
        time: new Date().getTime(),
        success: false,
        path: request.url,
        status,
      });
    }
  }
}
