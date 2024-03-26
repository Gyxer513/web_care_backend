import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.model';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { AdminDto } from './dto/admin.dto';
import { ConfigService } from '@nestjs/config';

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
          email: login,
          passwordHash: await hash(password, salt),
          role: 'admin',
        });
        return newUser.save();
      }
      return undefined;
    }
    return undefined;
  }

  async createUser(data: UserDto) {
    const {} = data;
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: data.login,
      passwordHash: await hash(data.password, salt),
      role: data.role,
    });
    return newUser.save();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
