import { Role } from '@prisma/client';
import { Request } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      email: string;
      name: string;
      role: Role;
    };
  }
}
