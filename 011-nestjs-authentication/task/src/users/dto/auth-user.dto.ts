import IUser from '../interfaces/interfaces';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: IUser['email'];

  @IsStrongPassword()
  @IsNotEmpty()
  password: IUser['password'];
}
