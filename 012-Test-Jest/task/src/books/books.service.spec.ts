import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const mockBook = {
    title: 'Book #1',
    authors: 'Author #1',
    description: 'Description #1',
  };
  const updatedMockBook = {
    title: 'Book Updated',
    authors: 'Author Updated',
    description: 'Description Updated',
  };

  const updatedBookResult = {
    id: '1',
    title: 'Book Updated',
    authors: 'Author Updated',
    favorite: false,
    description: 'Description Updated',
  };

  const booksArray = [
    {
      title: 'Book #1',
      authors: 'Author #1',
      description: 'Description #1',
    },
    {
      title: 'Book #2',
      authors: 'Author #2',
      description: 'Description #2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.findAll();
    expect(books).toEqual(booksArray);
  });

  it('should return a book', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);
    const book = await service.findOne('1');
    expect(book).toEqual(mockBook);
  });

  it('should insert a new book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(
      (): Promise<any> =>
        Promise.resolve({
          id: '1',
          title: 'Book #1',
          authors: 'Author #1',
          favorite: false,
          description: 'Description #1',
        }),
    );
    const newBook = await service.create(mockBook);
    expect(newBook).toEqual({
      id: '1',
      title: 'Book #1',
      authors: 'Author #1',
      favorite: false,
      description: 'Description #1',
    });
  });

  it('should update book', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(updatedBookResult),
    } as any);
    const updatedBook = await service.update('1', updatedMockBook);
    expect(updatedBook).toEqual(updatedBookResult);
  });

  it('should delete book', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(updatedBookResult),
    } as any);
    const deletedBook = await service.remove('1');
    expect(deletedBook).toEqual(updatedBookResult);
  });
});
