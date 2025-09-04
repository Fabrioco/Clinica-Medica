import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
import { DoctorDto } from 'src/modules/doctors/dto/doctor';
import { PatientDto } from 'src/modules/patients/dto/patient.dto';

export class AppointmentDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  patientId: number;

  @ApiPropertyOptional()
  @IsOptional()
  patient?: PatientDto;

  @ApiProperty()
  @IsNumber()
  doctorId: number;

  @ApiPropertyOptional()
  @IsOptional()
  doctor?: DoctorDto;

  @ApiProperty()
  @IsDate()
  appointmentDate: Date;

  @ApiProperty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
