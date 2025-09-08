import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { PasswordHelperUtils } from 'src/utils/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordHelper: PasswordHelperUtils,
  ) {}

  async register(registerDto: RegisterRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.passwordHelper.hashPassword(
      registerDto.password,
    );

    const createdUser = await this.prisma.user.create({
      data: {
        ...registerDto,
        password: hashedPassword,
      },
    });

    const token = this.createToken(createdUser);

    return {
      token,
      user: this.getUserResponse(createdUser),
    };
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new ConflictException('Credentials invalid');
    }

    const isPasswordValid = await this.passwordHelper.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Credentials invalid');
    }

    const token = this.createToken(user);

    return {
      token,
      user: this.getUserResponse(user),
    };
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getUserResponse(user);
  }

  private createToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      },
    );
  }

  private getUserResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };
  }
}
