import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { AuthDto } from '../dto/auth.dto';
import { IUser } from '../../user/entities/models/user.interface';

jest.mock('bcryptjs', () => ({ compareSync: jest.fn() }));

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue({ findOne: jest.fn() })
      .overrideProvider(JwtService)
      .useValue({ sign: jest.fn() })
    .compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should validate user with correct email and password', async () => {
      const mockCompareSync = compareSync as jest.Mock;
      mockCompareSync.mockReturnValue(true);
  
  
      const user: IUser = { id: 1, username: 'test', email: 'test@example.com', password: 'test123', role: 'user' };
      const authDto: AuthDto = { email: 'test@example.com', password: 'test123' };
  
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  
      expect(await authService.validateUser(authDto)).toEqual({ user, isValidPassword: true });
    });
  
  
    it('should validate user with incorrect email', async () => {
      const authDto: AuthDto = { email: 'invalid@example.com', password: 'test123' };
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
  
      expect(await authService.validateUser(authDto)).toEqual({ user: null, isValidPassword: false });
    });
  
    it('should validate user with incorrect password', async () => {
      const mockCompareSync = compareSync as jest.Mock;
      mockCompareSync.mockReturnValue(false);
  
      const user: IUser = { id: 1, username: 'test', email: 'test@example.com', password: 'test123', role: 'user' };
      const authDto: AuthDto = { email: 'test@example.com', password: 'wrong' };
      
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  
      expect(await authService.validateUser(authDto)).toEqual({ user, isValidPassword: false });
    });
  })

  describe('login', () => {
    it('should generate jwt token for valid user', async () => {
      const user: IUser = { id: 1, username: 'test', email: 'test@example.com', password: 'test123', role: 'user' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('test_token');
  
      const result = await authService.login(user);
  
      expect(result).toEqual({ access_token: 'test_token' });
    });
  })
});