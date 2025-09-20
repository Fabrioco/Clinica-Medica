import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do paciente',
    uniqueItems: true,
  })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Data de nascimento do paciente',
  })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do paciente',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do paciente',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'SUS',
    description: 'Plano de saude do paciente',
    required: false,
  })
  @IsString()
  @IsOptional()
  healthPlan?: string;
}
