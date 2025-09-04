import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({
    example: AppointmentStatus.scheduled,
    description: 'Status da consulta',
    enum: AppointmentStatus,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiProperty({
    example: 'Observações sobre a consulta',
    required: false,
    description: 'Observações sobre a consulta',
    type: String,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    required: false,
    description: 'Data e hora da consulta',
  })
  @IsDate()
  @IsOptional()
  appointmentDate?: Date;
}
