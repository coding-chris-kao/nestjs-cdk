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
      response.status(exception.getStatus()).json(exception.getResponse());
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
