import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

const AdminLoginRequestSchema = z.object({
  login: z.string().email(),
  password: z.string(),
  adminKey: z.string(),
});

export class AdminDto extends createZodDto(AdminLoginRequestSchema) {}
