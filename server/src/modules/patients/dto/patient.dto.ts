import { IsString, IsDate, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../modules/auth/dto/user.dto';

export class PatientDto {
  @ApiProperty({
    example: 1,
    description: 'Id do paciente',
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    example: 1,
    description: 'Id do usuário',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do paciente',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    example: '2023-05-01',
    description: 'Data de nascimento do paciente',
  })
  @IsDate()
  birthDate: Date;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do paciente',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do paciente',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'SUS',
    description: 'Plano de saude do paciente',
  })
  @IsOptional()
  @IsString()
  healthPlan?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Data de cadastro do paciente',
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Data de atualização do paciente',
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    type: UserDto,
    description: 'Informações do usuário',
    readOnly: true,
  })
  user?: UserDto;
}
