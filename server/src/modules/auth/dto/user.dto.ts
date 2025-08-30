import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the user',
  })
  id: number;

  @ApiProperty({
    example: 'Usuário 1',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ enum: Role, description: 'The role of the user' })
  role: string;
}
