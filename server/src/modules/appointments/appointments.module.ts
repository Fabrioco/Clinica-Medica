import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { PrismaService } from '../database/prisma.service';
import { AppointmentsService } from './appointments.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [AppointmentsController],
  providers: [PrismaService, AppointmentsService],
})
export class AppointmentsModule {}
