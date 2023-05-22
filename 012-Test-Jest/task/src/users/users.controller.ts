import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { HttpExceptionFilter } from '../books/exeption.filter';
import { ValidationPipe } from '../books/validation.pipe';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { Public } from '../public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  @UseFilters(HttpExceptionFilter)
  signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Post('signin')
  @UseFilters(HttpExceptionFilter)
  signin(@Body(new ValidationPipe()) authUserDto: AuthUserDto) {
    return this.authService.createToken(authUserDto);
  }
}
