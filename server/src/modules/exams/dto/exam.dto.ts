import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { AppointmentDto } from 'src/modules/appointments/dto/appointment.dto';
import { DoctorDto } from 'src/modules/doctors/dto/doctor';
import { PatientDto } from 'src/modules/patients/dto/patient.dto';

export class ExamDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  appointmentId: number;

  @ApiProperty({ type: AppointmentDto })
  appointment: AppointmentDto;

  @ApiProperty({ example: 1 })
  @IsNumber()
  patientId: number;

  @ApiProperty({ type: PatientDto })
  @IsOptional()
  patient: PatientDto;

  @ApiProperty({ example: 1 })
  @IsNumber()
  doctorId: number;

  @ApiProperty({ type: DoctorDto })
  @IsOptional()
  doctor: DoctorDto;

  @ApiProperty({ example: 'Hemograma' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/result.pdf' })
  @IsOptional()
  @IsString()
  resultFile?: string;

  @ApiProperty({ example: '2023-05-01T12:00:00.000Z' })
  @IsDate()
  resultDate: Date;

  @ApiProperty({ example: '2023-05-01T12:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2023-05-01T12:00:00.000Z' })
  @IsDate()
  updatedAt: Date;
}
