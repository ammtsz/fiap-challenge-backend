import { NotFoundException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundExceptionFilter } from '../not-found-exception.filter';

describe('NotFoundExceptionFilter', () => {
  let filter: NotFoundExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new NotFoundExceptionFilter();

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

  it('should return status code 404 with the correct message', () => {
    const exception = new NotFoundException();
    const status = exception.getStatus();
    
    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(status);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: status,
      message: 'O recurso solicitado não foi encontrado',
    });
  });
});
