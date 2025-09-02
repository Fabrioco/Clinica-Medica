import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';

export class UpdateAppointmentDto {
  @ApiProperty({
    example: AppointmentStatus.scheduled,
    description: 'Status da consulta',
    enum: AppointmentStatus,
    required: false,
  })
  status: AppointmentStatus;

  @ApiProperty({
    example: 'Observações sobre a consulta',
    required: false,
    description: 'Observações sobre a consulta',
    type: String,
  })
  notes?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    required: false,
    description: 'Data e hora da consulta',
  })
  appointmentDate?: Date;
}
