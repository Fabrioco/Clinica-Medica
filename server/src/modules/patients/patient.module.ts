import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientService],
})
export class PatientModule {}
