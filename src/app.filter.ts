import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      let error: Error;
      let status = exception.getStatus();
      if (res instanceof Error) {
        status = 500;
        error = { name: res.name, message: res.message, stack: res.stack };
      } else {
        error = res;
      }
      console.log({ error });
      response.status(status).json(error);
    } else {
      const error = {
        statusCode: 500,
        error: 'Internal Server Error',
        message: exception?.stack ? `${exception.stack}` : exception,
      };
      console.log({ error });
      response.status(500).json(error);
    }
  }
}
