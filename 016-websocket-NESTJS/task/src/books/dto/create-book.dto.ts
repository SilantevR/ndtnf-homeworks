import { IBook } from '../interfaces/interfaces';
import { IsString, Length, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message: 'Параметр должен содержать от 3 до 20 символов',
  })
  title: IBook['title'];
  @IsString()
  @IsNotEmpty()
  @Length(10, 250, {
    message: (args) => {
      //console.log(args);
      return 'Параметр должен содержать от 10 до 250 символов';
    },
  })
  description: IBook['description'];
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message: 'Параметр должен содержать от 3 до 20 символов',
  })
  authors: IBook['authors'];
}
