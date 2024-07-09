import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from '../services/posts.service';
import { IPost } from '../entities/models/posts.interface';

describe('PostsController', () => {
  let controller: PostsController;
  const dto = {
    id: '1',
    title: 'first post',
    content: 'content from the first post',
    user_id: 1
  }
  let postsList: Promise<IPost[]>;
  let singlePost: Promise<IPost>;
  let searchTerms: string;
  let postId: string;

  const mockPostsService = {
    findAll: jest.fn(),
    findAllAdmin: jest.fn(),
    filter: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{
        provide: PostsService,
        useValue: mockPostsService
      }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all posts when findAll() called', () => {
    jest.spyOn(mockPostsService, 'findAll').mockReturnValue(postsList);
    const result = controller.findAll();
    expect(mockPostsService.findAll).toHaveBeenCalled();
    expect(result).toBe(postsList);
  });

  it('should return all posts when findAllAdmin() called', () => {
    jest.spyOn(mockPostsService, 'findAllAdmin').mockReturnValue(postsList);
    const result = controller.findAllAdmin();
    expect(mockPostsService.findAll).toHaveBeenCalled();
    expect(result).toBe(postsList);
  });

  it('should filter posts with a keyword when filter(searchTerms) called', () => {
    jest.spyOn(mockPostsService, 'filter').mockReturnValue(postsList);
    const result = controller.filter(searchTerms);
    expect(mockPostsService.filter).toHaveBeenCalledWith(searchTerms);
    expect(result).toBe(postsList);
  });

  it('should return a post with an id when findOne(postId) called', () => {
    jest.spyOn(mockPostsService, 'findOne').mockReturnValue(singlePost);
    const result = controller.findOne(postId);
    expect(mockPostsService.findOne).toHaveBeenCalledWith(postId);
    expect(result).toBe(singlePost);
  });

  it('should create a post and return void when create(dto) called', () => {
    const result = controller.create(dto);
    expect(mockPostsService.create).toHaveBeenCalledWith(dto);
    expect(result).toBeUndefined();
  });

  it('should update a post and return void when update(postId, dto) called', () => {
    const result = controller.update(postId, dto);
    expect(mockPostsService.update).toHaveBeenCalledWith(postId, dto);
    expect(result).toBeUndefined();
  });

  it('should remove a post and return void when remove(postId) called', () => {
    const result = controller.remove(postId);
    expect(mockPostsService.remove).toHaveBeenCalledWith(postId);
    expect(result).toBeUndefined();
  });
});