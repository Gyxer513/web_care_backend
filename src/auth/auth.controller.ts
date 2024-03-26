import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ZodValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {
    const { login } = await this.authService.validateUser(dto.login, dto.password);
    return this.authService.login(login);
  }
}
