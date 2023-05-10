import { IBook } from '../interfaces/interfaces';

export class CreateBookDto {
  title: IBook['title'];
  description: IBook['description'];
  authors: IBook['authors'];
}
