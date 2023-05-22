import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksModule } from '../src/books/books.module';
import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';
import { Book } from '../src/books/schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  //let booksService: BooksService;
  //let model: Model<Book>;
  let booksService = { findAll: () => ['books'] };
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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: jest.fn(),
          //useValue: { find: jest.fn(), exec: jest.fn() },
        },
      ],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    //booksService = moduleFixture.get<BooksService>(BooksService);
    //model = moduleFixture.get<Model<Book>>(getModelToken('Book'));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', () => {
    /* jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValue(booksArray),
    } as any);*/
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect({ status: 'success', data: ['books'] });
    //.expect({ status: 'success', data: booksArray });
  });
});
