import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token not found');
    }

    const [, token] = authHeader.split(' ');

    try {
      const payload = this.jwtService.verify<{
        id: number;
        email: string;
        name: string;
        role: Role;
      }>(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = {
        id: payload.id,
        role: payload.role,
        email: payload.email,
        name: payload.name,
      };

      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token invalid');
    }
  }
}
