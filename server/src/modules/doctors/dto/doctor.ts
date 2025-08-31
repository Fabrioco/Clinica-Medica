import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/auth/dto/user.dto';

export class DoctorDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the doctor',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user',
  })
  userId: number;

  @ApiProperty({
    example: '123456',
    description: 'CRM of the doctor',
  })
  crm: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Specialty of the doctor',
  })
  specialty: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Phone of the doctor',
  })
  phone: string;

  @ApiProperty({
    type: UserDto,
    description: 'Informações do usuário',
    readOnly: true,
  })
  user?: UserDto;
}
