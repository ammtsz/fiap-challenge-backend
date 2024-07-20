import { BadRequestException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BadRequestExceptionFilter } from '../bad-request-exception.filter';

describe('BadRequestExceptionFilter', () => {
  let filter: BadRequestExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new BadRequestExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn() as any,
    };

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis() as any,
      getResponse: jest.fn().mockReturnValue(mockResponse) as any,
    } as Partial<ArgumentsHost>;
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should return status code 400 with the correct message and errors', () => {
    const exceptionResponse = {
      message: 'Erro na validação dos dados',
    };

    const exception = new BadRequestException(exceptionResponse);
    const status = exception.getStatus();
    const response = exception.getResponse();
    
    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: status,
      message: 'Requisição inválida, por favor verifique os dados fornecidos',
      errors: exceptionResponse.message,
    });
  });
});
