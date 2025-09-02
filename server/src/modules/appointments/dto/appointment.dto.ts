import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { DoctorDto } from 'src/modules/doctors/dto/doctor';
import { PatientDto } from 'src/modules/patients/dto/patient.dto';

export class AppointmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiPropertyOptional()
  patient?: PatientDto;

  @ApiProperty()
  doctorId: number;

  @ApiPropertyOptional()
  doctor?: DoctorDto;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  status: AppointmentStatus;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
