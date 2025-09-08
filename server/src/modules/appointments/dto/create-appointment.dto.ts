import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'Id do paciente',
    required: true,
  })
  @IsNumber()
  patientId: number;

  @ApiProperty({
    example: 1,
    description: 'Id do médico',
    required: true,
  })
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Data e hora da consulta',
    required: true,
  })
  @Type(() => Date)
  @IsDate()
  appointmentDate: Date;

  @ApiProperty({
    example: 'Observações sobre a consulta',
    required: false,
    description: 'Observações sobre a consulta',
    type: String,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
