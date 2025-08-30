import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserDto } from './user.dto';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Usuário 1',
    description: 'The name of the user',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'User@123',
    description: 'The password of the user',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class RegisterResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...',
    description: 'The token of the user',
  })
  token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
