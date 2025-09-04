import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty({
    example: '123456',
    description: 'CRM do médico',
  })
  @IsString()
  @IsOptional()
  crm?: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Especialidade do médico',
  })
  @IsString()
  @IsOptional()
  specialty?: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do médico',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
