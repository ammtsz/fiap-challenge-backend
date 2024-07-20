import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { DuplicateRecordException } from '../../filters/duplicate-record-exception.filter';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const dto = {
    username: "danilo",
    email: "danilo@mail.com ",
    password: "senha",
    role: "professor"
  }

  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  const mockJwtService = {
    sign: jest.fn(() => 'testToken'),
  };

  const notFoundMessage = 'Ocorreu um erro com a requisição solicitada. Verfique os dados fornecidos e tente novamente.';

  beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('UserController should be defined', async () => {
    expect(userController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(userController.create(dto)).resolves.toBe('Usuário criado com sucesso!');;
      expect(mockUserService.create).toHaveBeenCalledWith({
        ...dto,
        password: expect.any(String),
      });
    });

    it('should throw DuplicateRecordException when creating a user with an existing email', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      expect(userController.create(dto)).rejects.toThrow(DuplicateRecordException);
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  })

  describe('findOne()', () => {
    it('should return a user when findOne(email) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      expect(userController.findOne(dto.email)).resolves.toBe(dto);
      expect(mockUserService.findOne).toHaveBeenCalledWith(dto.email);


    });
  
    it('should return not found message when findOne(email) called and user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      
      expect(userController.findOne(dto.email)).resolves.toBe(notFoundMessage);
    });
  })

  describe('update()', () => {
    it('should update username when update(email, user) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      await expect(userController.update(dto.email, {username: dto.username})).resolves.toBe('Usuário atualizado com sucesso!');
      expect(mockUserService.update).toHaveBeenCalledWith(dto.email, {username: dto.username});
    });

    it('should update email when update(email, user) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null);
      
      await expect(userController.update(dto.email, {email: dto.email})).resolves.toBe('Usuário atualizado com sucesso!');
      expect(mockUserService.update).toHaveBeenCalledWith(dto.email, {email: dto.email});
    });

    it('should throw DuplicateRecordException when update(email, user) called to update the email with an existent email', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      
      await expect(userController.update(dto.email, {email: dto.email})).rejects.toThrow(DuplicateRecordException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should return an error message when update(email, user) called and user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      
      await expect(userController.update(dto.email, dto)).resolves.toBe(notFoundMessage);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when update(email, user) called with invalid dto', async () => {
      await expect(userController.update(dto.email, {})).rejects.toThrow(BadRequestException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });
  })

  describe('remove()', () => {
    it('should remove user when remove(email) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      await expect(userController.remove(dto.email)).resolves.toBe('Usuário deletado com sucesso!');
      expect(mockUserService.remove).toHaveBeenCalledWith(dto.email);
    });

    it('should return not found message when remove(email) called and user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      
      expect(userController.remove(dto.email)).resolves.toBe(notFoundMessage);
      expect(mockUserService.remove).not.toHaveBeenCalled();
    });
  });
});
