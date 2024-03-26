import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { AdminDto } from './dto/admin.dto';
import { ConfigService } from '@nestjs/config';
import { Role } from './entities/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Injectable()
export class UserService {
  createAdminKey: string;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createAdmin(data: AdminDto) {
    const { login, password, adminKey } = data;
    if (adminKey) {
      this.createAdminKey = this.configService.get('CREATE_ADMIN_KEY');
      if (this.createAdminKey === adminKey) {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
          login: login,
          passwordHash: await hash(password, salt),
          role: Role.ADMIN,
        });
        return newUser.save();
      }
      return undefined;
    }
    return undefined;
  }

  async createUser(data: UserDto) {
    const { password, login } = data;
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      login: login,
      passwordHash: await hash(password, salt),
      role: Role.USER,
    });
    return newUser.save();
  }

  async findByLogin(login: string) {
    return this.userModel.findOne({ login }).exec();
  }

  update(id: number, data: UserDto) {
    return data;
  }

  async findAll() {
    return this.userModel.find({});
  }
  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
