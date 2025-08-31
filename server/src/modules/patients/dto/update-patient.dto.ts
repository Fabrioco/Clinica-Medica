import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto {
  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do paciente',
    uniqueItems: true,
  })
  cpf?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Data de nascimento do paciente',
  })
  birthDate?: Date;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do paciente',
  })
  phone?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do paciente',
  })
  address?: string;

  @ApiProperty({
    example: 'SUS',
    description: 'Plano de saude do paciente',
    required: false,
  })
  healthPlan?: string;
}
