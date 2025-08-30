import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientService],
})
export class PatientModule {}
