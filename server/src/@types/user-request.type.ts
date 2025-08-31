import { Request } from '@nestjs/common';
import { Role } from '@prisma/client';

export type UserRequest = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

export type AuthRequest = Request & {
  user: UserRequest;
};
