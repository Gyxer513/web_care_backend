import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminDto } from './dto/admin.dto';
import { UserDto } from './dto/user.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CREATE_ADMIN_ERROR,
  CREATE_USER_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from '../utils/constants/error.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/admin.role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ZodValidationPipe())
  @Post('admin')
  async createAdmin(@Body() newAdminData: AdminDto) {
    const { login } = newAdminData;
    const findUser = await this.userService.findByLogin(login);
    if (findUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }
    const newAdmin = await this.userService.createAdmin(newAdminData);
    if (newAdmin) {
      return `Создан новый администратор ${login}`;
    }
    throw new BadRequestException(CREATE_ADMIN_ERROR);
  }

  @Post()
  async createUser(@Body() newAdminData: UserDto) {
    const { login } = newAdminData;
    const findUser = await this.userService.findByLogin(login);
    if (findUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }
    const newAdmin = await this.userService.createUser(newAdminData);
    if (newAdmin) {
      return `Создан новый пользователь ${login}`;
    }
    throw new BadRequestException(CREATE_USER_ERROR);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(id);
    return `Пользователь ${deletedUser.login} удален`
  }
}
