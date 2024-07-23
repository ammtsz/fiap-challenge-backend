import { AuthDto } from '../dto/auth.dto';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).overrideProvider(AuthService)
    .useValue(mockAuthService)
    .overrideProvider(JwtService)
    .useValue(mockJwtService)
    .compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    
    jest.clearAllMocks();
  });

  it('AuthController should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should validate the AuthDto object using ZodValidationPipe', async () => {
      const mockCredentials: AuthDto = { email: 'test@email.com', password: 'testPassword' };
      const mockValidateUser = jest.spyOn(authService, 'validateUser').mockResolvedValue({ isValidPassword: true, user: mockCredentials });

      await expect(authController.login(mockCredentials)).resolves.not.toThrow(UnauthorizedException);
      expect(mockValidateUser).toHaveBeenCalledWith(mockCredentials);
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const mockCredentials: AuthDto = { email: 'invalid@email.com', password: 'invalidPassword' };
      const mockValidateUser = jest.spyOn(authService, 'validateUser').mockResolvedValue({ isValidPassword: false, user: null });

      await expect(authController.login(mockCredentials)).rejects.toThrow(UnauthorizedException);
      expect(mockValidateUser).toHaveBeenCalledWith(mockCredentials);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const mockCredentials: AuthDto = { email: 'test@email.com', password: 'wrongPassword' };
      const mockValidateUser = jest.spyOn(authService, 'validateUser').mockResolvedValue({ isValidPassword: false, user: mockCredentials });

      await expect(authController.login(mockCredentials)).rejects.toThrow(UnauthorizedException);
      expect(mockValidateUser).toHaveBeenCalledWith(mockCredentials);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      const mockCredentials: AuthDto = { email: 'nonexistent@email.com', password: 'testPassword' };
      const mockValidateUser = jest.spyOn(authService, 'validateUser').mockResolvedValue({ isValidPassword: false, user: null });

      await expect(authController.login(mockCredentials)).rejects.toThrow(UnauthorizedException);
      expect(mockValidateUser).toHaveBeenCalledWith(mockCredentials);
    });

    it('should throw UnauthorizedException when validateUser throws an error', async () => {
      const mockCredentials: AuthDto = { email: 'test@email.com', password: 'testPassword' };
      const mockValidateUser = jest.spyOn(authService, 'validateUser').mockRejectedValue(new Error());

      await expect(authController.login(mockCredentials)).rejects.toThrow(InternalServerErrorException);
      expect(mockValidateUser).toHaveBeenCalledWith(mockCredentials);
    });
  });
});
