import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { UserPGRepository } from '../repositories/pg/user.pg.repository';


describe('UserController', () => {
  let userController: UserController;
  let email: string;
  const dto = {
    username: "danilo",
    email: "danilo@mail.com ",
    password: "senha",
    role: "professor"
  }

  const mockUserService = {
    create: jest.fn(dto => {
      return
    }),
    findOne: jest.fn(email => {
      return {
        ...dto,
        email: email
      }
    }),
    update: jest.fn((email, dto) => {
      return
    }),
    remove: jest.fn((email) => {
      return
    })
  };

  beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = app.get<UserController>(UserController);
  });


  it('UserController should be defined', async () => {
    expect(userController).toBeDefined();
  });

  it('create() should create a new user and return void', () => {
    expect(userController.create(dto)).toBeUndefined();
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  })

  it('findOne() should return a valid User dto', () => {
    expect(userController.findOne(email)).toEqual({
      ...dto,
      email: email
    })
    expect(mockUserService.findOne).toHaveBeenCalledWith(email);
  })

  it('update() should update data from user email and return void', () => {
    expect(userController.update(email, dto)).toBeUndefined();
    expect(mockUserService.update).toHaveBeenCalledWith(email, dto);
  })

  it('remove() should delete data from user email and return void', () => {
    expect(userController.remove(email)).toBeUndefined();
    expect(mockUserService.remove).toHaveBeenCalledWith(email);
  })


});