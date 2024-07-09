import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'Requisição inválida, por favor verifique os dados fornecidos',
        errors: exceptionResponse.message,
      });
  }
}
