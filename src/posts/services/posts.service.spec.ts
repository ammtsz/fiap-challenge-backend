import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from '../repositories/posts.repository';

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository: PostsRepository;
  
  const dto = {
    id: '1',
    title: 'first post',
    content: 'content from the first post',
    date: new Date(),
    user_id: 1
  }

  const post = {
    id: '3ad71df8-57d1-4d94-8473-f7f85aa16c05',
    title: 'Title 1',
    content: 'Content 1',
    date: new Date('2024-07-15T00:00:00.000Z'),
    user: {
        username: 'professor1'
    }
  }

  const mockPostsRepository = {
    getPosts: jest.fn(),
    filterPosts: jest.fn(),
    getPost: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService,
        {
          provide: PostsRepository,
          useValue: mockPostsRepository
        }
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postsRepository = module.get<PostsRepository>(PostsRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  it('should findAll() posts and return the posts', async () => {
    jest.spyOn(mockPostsRepository, 'getPosts').mockResolvedValue([post]);
    
    expect(await postsService.findAll()).toEqual([post]);
    expect(mockPostsRepository.getPosts).toHaveBeenCalled();
  });

  it('should filter(searchTerms) given a keyword and return the posts', async () => {
    const searchTerms = 'test search';

    jest.spyOn(mockPostsRepository, 'filterPosts').mockResolvedValue([post]);

    expect(await postsService.filter(searchTerms)).toEqual([post]);
    expect(mockPostsRepository.filterPosts).toHaveBeenCalledWith(searchTerms);
  });

  it('should findOne(postId) given an id and return the post', async () => {
    jest.spyOn(mockPostsRepository, 'getPost').mockResolvedValue(post);

    expect(await postsService.findOne(post.id)).toEqual(post);
    expect(mockPostsRepository.getPost).toHaveBeenCalledWith(post.id);
  });

  it('should create(dto) given a dto and return void', async () => {
    expect(await postsService.create(dto)).toBeUndefined();
    expect(mockPostsRepository.createPost).toHaveBeenCalledWith(dto);
  });

  it('should update(postId, dto) a post and return void', async () => {
    expect(await postsService.update(post.id, dto)).toBeUndefined();
    expect(mockPostsRepository.updatePost).toHaveBeenCalledWith(post.id, dto);
  });

  it('should remove(postId) a post given an id and return void', async () => {
    expect(await postsService.remove(post.id)).toBeUndefined();
    expect(mockPostsRepository.deletePost).toHaveBeenCalledWith(post.id);
  });
});