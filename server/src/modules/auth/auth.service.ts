import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginRequestDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterRequestDto) {
    const verifyUser = await this.findUserByEmail(registerDto.email);
    if (verifyUser) {
      throw new ConflictException('User already exists');
    }

    registerDto.password = this.hashPassword(registerDto.password);

    const user: User = await this.createUser(registerDto);

    const token = this.createToken(user);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.findUserByEmail(loginDto.email);
    if (!user) {
      throw new ConflictException('Credentials invalid');
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new ConflictException('Credentials invalid');
    }

    const token = this.createToken(user);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
      },
    };
  }

  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  private async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
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

  private async createUser(registerDto: RegisterRequestDto) {
    return await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
      },
    });
  }
}
