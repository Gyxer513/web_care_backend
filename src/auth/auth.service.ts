import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtSevice: JwtService, private readonly userService: UserService) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return { login: user.login };
  }

  async login(login: string) {
    const payload = { login };
    return {
      access_token: await this.jwtSevice.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
