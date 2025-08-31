import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  userId?: number;

  @ApiProperty({
    example: '123456',
    description: 'CRM do médico',
  })
  crm: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Especialidade do médico',
  })
  specialty: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do médico',
  })
  phone: string;
}
