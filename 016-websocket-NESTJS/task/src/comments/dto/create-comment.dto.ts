import { IComment } from '../interfaces/interfaces';
import { IsString, Length, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  //@IsMongoId()
  bookId: IComment['bookId'];
  @IsString()
  @IsNotEmpty()
  @Length(3, 250, {
    message: 'Параметр должен содержать от 3 до 250 символов',
  })
  comment: IComment['comment'];
  @IsString()
  @IsNotEmpty()
  user: IComment['user'];
}
