import { BadRequestException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationExceptionFilter } from '../validation-exception.filter';

describe('ValidationExceptionFilter', () => {
  let filter: ValidationExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new ValidationExceptionFilter();

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
      message: 'Dados fornecidos são inválidos',
    };

    const exception = new BadRequestException(exceptionResponse);
    const status = exception.getStatus();
    
    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: status,
      message: exceptionResponse.message || 'Erro de validação',
      errors: exceptionResponse.message,
    });
  });
});
