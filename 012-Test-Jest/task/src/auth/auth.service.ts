import { BadRequestException } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateSignup(authUserDto: AuthUserDto): Promise<any> {
    const user = await this.usersService.find(authUserDto);
    if (user && user.password === authUserDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateSignin(payload: Record<string, string>): Promise<any> {
    const user = await this.usersService.findById(payload.id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createToken(payload: AuthUserDto) {
    const user = await this.validateSignup(payload);

    if (!user) {
      throw new BadRequestException({
        status: 'fail',
        description: 'Неправильный email или пароль.',
      });
    } else {
      return {
        access_token: this.jwtService.sign(
          { id: user['_doc']['_id'] },
          {
            secret: this.configService.get('JWT_SECRET', { infer: true }),
            expiresIn: '60s',
          },
        ),
        user: user['_doc']['_id'],
      };
    }
  }
}
