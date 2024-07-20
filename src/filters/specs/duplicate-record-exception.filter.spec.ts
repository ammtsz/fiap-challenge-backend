import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { DuplicateRecordException, DuplicateRecordExceptionFilter } from "../duplicate-record-exception.filter";

describe('DuplicateRecordExceptionFilter', () => {
  let filter: DuplicateRecordExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new DuplicateRecordExceptionFilter();

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

  it('should return status code 409 and the correct message', () => {
    const exception = new DuplicateRecordException();
    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
    });
  });
});
