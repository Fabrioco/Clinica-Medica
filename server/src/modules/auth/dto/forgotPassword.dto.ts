import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 312443,
    description: 'Code for reset password',
    required: true,
  })
  code: number;
  @ApiProperty({
    example: 'User@123',
    description: 'The password of the user',
    required: true,
  })
  password: string;
  @ApiProperty({
    example: 'User@123',
    description: 'The password of the user',
    required: true,
  })
  confirmPassword: string;
}
