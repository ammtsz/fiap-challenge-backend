import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let email: string;
  const dto = {
    username: "danilo",
    email: "danilo@mail.com ",
    password: "senha",
    role: "professor"
  }

  const mockUserRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: UserService,
          useValue: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create() a user and return void', async () => {
    const result = await service.create(dto);
    expect(result).toBeUndefined();
    expect(mockUserRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should findOne() user and return a dto', async() => {
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(dto);
    const result = await service.findOne(email);
    expect(result).toBe(dto);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith(email);
  });

  it('should update() a user given email and dto and return void', async () => {
    const result = await service.update(email, dto);
    expect(result).toBeUndefined();
    expect(mockUserRepository.update).toHaveBeenCalledWith(email, dto);
  });

  it('should delete() a user and return void', async () => {
    const result = await service.remove(email);
    expect(result).toBeUndefined();
    expect(mockUserRepository.remove).toHaveBeenCalledWith(email);
  });
});