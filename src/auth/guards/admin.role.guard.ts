import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Role } from '../../user/entities/role.enum';
import { User } from '../../user/entities/user.model';
import { UserService } from '../../user/user.service';
import { ADMIN_EXEPTION_ERROR } from '../../utils/constants/error.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const login: string = await context.switchToHttp().getRequest().body.login;
    const userData: User = await this.userService.findByLogin(login);
    if (userData?.role !== Role.ADMIN) {
      throw new HttpException(ADMIN_EXEPTION_ERROR, HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
