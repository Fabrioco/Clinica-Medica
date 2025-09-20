import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  userId?: number;

  @ApiProperty({
    example: '123456',
    description: 'CRM do médico',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  crm: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Especialidade do médico',
  })
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do médico',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
