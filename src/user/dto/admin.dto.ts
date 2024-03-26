import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

const AdminLoginRequestShema = z.object({
  login: z.string().email(),
  password: z.string(),
  adminKey: z.string(),
  role: z.string(),
});

export class AdminDto extends createZodDto(AdminLoginRequestShema) {}
