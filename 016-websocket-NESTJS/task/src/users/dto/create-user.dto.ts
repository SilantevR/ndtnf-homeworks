import IUser from '../interfaces/interfaces';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message: 'Параметр должен содержать от 3 до 20 символов',
  })
  login: IUser['login'];
  @IsString()
  @IsNotEmpty()
  @Length(10, 250, {
    message: (args) => {
      //console.log(args);
      return 'Параметр должен содержать от 10 до 250 символов';
    },
  })
  name: IUser['name'];
  @IsEmail()
  @IsNotEmpty()
  email: IUser['email'];

  @IsStrongPassword()
  @IsNotEmpty()
  password: IUser['password'];
}
