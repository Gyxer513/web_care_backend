import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

const UserLoginRequestShema = z.object({
  login: z.string().email(),
  password: z.string(),
  role: z.string().optional(),
});

export class UserDto extends createZodDto(UserLoginRequestShema) {}
