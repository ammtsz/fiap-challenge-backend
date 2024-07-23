import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  
  const dto = {
    username: "danilo",
    email: "danilo@mail.com ",
    password: "senha",
    role: "professor"
  }

  const mockUserRepository = {
    createUser: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create() a user and return void', async () => {
    expect(await userService.create(dto)).toBeUndefined();
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(dto);
  });

  it('should findOne() user and return a dto', async() => {
    jest.spyOn(mockUserRepository, 'getUser').mockReturnValue(dto);
    
    expect(await userService.findOne(dto.email)).toEqual(dto);
    expect(mockUserRepository.getUser).toHaveBeenCalledWith(dto.email);
  });

  it('should update() a user given email and dto and return void', async () => {
    expect(await userService.update(dto.email, dto)).toBeUndefined();
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(dto.email, dto);
  });

  it('should delete() a user and return void', async () => {
    expect(await userService.remove(dto.email)).toBeUndefined();
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(dto.email);
  });
});