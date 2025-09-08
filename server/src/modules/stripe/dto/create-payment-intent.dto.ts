import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreatePaymentIntentDto {
  @ApiProperty({
    description: 'Valor em centavos (ex: R$ 100 = 10000)',
    example: 10000,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'ID da conta conectada do doutor',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  doctorId: number;

  @ApiProperty({
    description: 'ID da conta conectada do paciente',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  patientId: number;

  @ApiProperty({
    description: 'ID da consulta',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  appointmentId: number;
}
