import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PasswordHelperUtils } from '../../utils/password.helper';

@Injectable()
export class NoAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHelper: PasswordHelperUtils,
  ) {}

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toLocaleString(
      'pt-BR',
      { timeZone: 'America/Sao_Paulo' },
    );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    console.log('Código para desenvolvimento:', code);

    return {
      message: 'Your code will expire in 10 minutes',
      expiresAt,
    };
  }

  async resetPassword(
    email: string,
    code: number,
    password: string,
    confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.code !== code) {
      throw new BadRequestException('Code invalid');
    }

    if (!user.expiresAt || user.expiresAt < new Date()) {
      throw new BadRequestException('Code expired');
    }

    const hashedPassword = await this.passwordHelper.hashPassword(password);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        code: null,
        expiresAt: null,
      },
    });

    return {
      message: 'Password reset successfully',
    };
  }
}
