import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class LoginRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsString()
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
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...',
    description: 'The token of the user',
  })
  token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
