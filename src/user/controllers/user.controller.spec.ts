import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { DuplicateRecordException } from '../../filters/duplicate-record-exception.filter';
import { BadRequestException, NotFoundException } from '@nestjs/common';


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

      await expect(userController.create(dto)).resolves.toEqual('Usuário criado com sucesso!');;
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
      
      expect(userController.findOne(dto.email)).resolves.toEqual(dto);
      expect(mockUserService.findOne).toHaveBeenCalledWith(dto.email);
    });
  
    it('should return NotFoundException when findOne(email) called and user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = userController.findOne(dto.email)
      expect(result).rejects.toThrow(NotFoundException);
    });

    it('should return BadRequestException when findOne(email) called with empty email', async () => {
      const result = userController.findOne('')
      expect(result).rejects.toThrow(BadRequestException);
      expect(result).rejects.toThrow('Especifique o e-mail do usuário.');
      expect(mockUserService.findOne).not.toHaveBeenCalled();
    });
  })

  describe('update()', () => {
    it('should update username when update(email, user) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      await expect(userController.update(dto.email, {username: dto.username})).resolves.toEqual('Usuário atualizado com sucesso!');
      expect(mockUserService.update).toHaveBeenCalledWith(dto.email, {username: dto.username});
    });

    it('should update email when update(email, user) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null);
      
      await expect(userController.update(dto.email, {email: dto.email})).resolves.toEqual('Usuário atualizado com sucesso!');
      expect(mockUserService.update).toHaveBeenCalledWith(dto.email, {email: dto.email});
    });

    it('should throw DuplicateRecordException when update(email, user) called to update the email with an existent email', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(dto);
      
      await expect(userController.update(dto.email, {email: dto.email})).rejects.toThrow(DuplicateRecordException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when update(email, user) called and user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      
      await expect(userController.update(dto.email, dto)).rejects.toThrow(NotFoundException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when update(email, user) called with invalid dto', async () => {
      await expect(userController.update(dto.email, {})).rejects.toThrow(BadRequestException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when update(email, user) called without an email', async () => {
      await expect(userController.update(dto.email, {})).rejects.toThrow(BadRequestException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });
  })

  describe('remove()', () => {
    it('should remove user when remove(email) called', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(dto);
      
      await expect(userController.remove(dto.email)).resolves.toEqual('Usuário deletado com sucesso!');
      expect(mockUserService.remove).toHaveBeenCalledWith(dto.email);
    });

    it('should throw NotFoundException when remove(email) called and user not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);
      
      expect(userController.remove(dto.email)).rejects.toThrow(NotFoundException);
      expect(mockUserService.remove).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when remove(email) called without an email', async () => {
      await expect(userController.remove('')).rejects.toThrow(BadRequestException);
      expect(mockUserService.update).not.toHaveBeenCalled();
    });
  });
});
