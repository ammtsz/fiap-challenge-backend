import { InternalServerErrorException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { InternalServerErrorExceptionFilter } from '../internal-server-error-exception.filter';

describe('InternalServerErrorExceptionFilter', () => {
  let filter: InternalServerErrorExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new InternalServerErrorExceptionFilter();

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

  it('should return status code 500 with the correct message', () => {
    const exception = new InternalServerErrorException();
    const status = exception.getStatus();
    
    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: status,
      message: 'Erro interno do servidor, por favor tente novamente mais tarde',
    });
  });
});
