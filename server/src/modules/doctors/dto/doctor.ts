import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { UserDto } from 'src/modules/auth/dto/user.dto';

export class DoctorDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the doctor',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: '123456',
    description: 'CRM of the doctor',
  })
  @IsString()
  crm: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Specialty of the doctor',
  })
  @IsString()
  specialty: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Phone of the doctor',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    type: UserDto,
    description: 'Informações do usuário',
    readOnly: true,
  })
  @IsOptional()
  user?: UserDto;
}
