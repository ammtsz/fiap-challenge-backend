import { HttpException, HttpStatus, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export class DuplicateRecordException extends HttpException {
  constructor() {
    super('Registro duplicado encontrado', HttpStatus.CONFLICT);
  }
}

@Catch(DuplicateRecordException)
export class DuplicateRecordExceptionFilter extends DuplicateRecordException implements ExceptionFilter {
  catch(exception: DuplicateRecordException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.CONFLICT;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
      });
  }
}
