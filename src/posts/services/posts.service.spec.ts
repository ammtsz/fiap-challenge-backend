import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { IPost } from '../entities/models/posts.interface';

describe('PostsService', () => {
  let service: PostsService;
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

  const mockPostsRepository = {
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
      providers: [PostsService,
        {
          provide: PostsService,
          useValue: mockPostsRepository
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all posts when findAll() called', () => {
    jest.spyOn(mockPostsRepository, 'findAll').mockReturnValue(postsList);
    const result = service.findAll();
    expect(mockPostsRepository.findAll).toHaveBeenCalled();
    expect(result).toBe(postsList);
  });

  it('should return all posts when findAllAdmin() called', () => {
    jest.spyOn(mockPostsRepository, 'findAllAdmin').mockReturnValue(postsList);
    const result = service.findAll();
    expect(mockPostsRepository.findAll).toHaveBeenCalled();
    expect(result).toBe(postsList);
  });

  it('should filter posts with a keyword when filter(searchTerms) called', () => {
    jest.spyOn(mockPostsRepository, 'filter').mockReturnValue(postsList);
    const result = service.filter(searchTerms);
    expect(mockPostsRepository.filter).toHaveBeenCalledWith(searchTerms);
    expect(result).toBe(postsList);
  });

  it('should return a post with an id when findOne(postId) called', () => {
    jest.spyOn(mockPostsRepository, 'findOne').mockReturnValue(singlePost);
    const result = service.findOne(postId);
    expect(mockPostsRepository.findOne).toHaveBeenCalledWith(postId);
    expect(result).toBe(singlePost);
  });

  it('should create a post and return void when create(dto) called', () => {
    const result = service.create(dto);
    expect(mockPostsRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toBeUndefined();
  });

  it('should update a post and return void when update(postId, dto) called', () => {
    const result = service.update(postId, dto);
    expect(mockPostsRepository.update).toHaveBeenCalledWith(postId, dto);
    expect(result).toBeUndefined();
  });

  it('should remove a post and return void when remove(postId) called', () => {
    const result = service.remove(postId);
    expect(mockPostsRepository.remove).toHaveBeenCalledWith(postId);
    expect(result).toBeUndefined();
  });
});