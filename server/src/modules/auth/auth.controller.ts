import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('User - Authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterRequestDto,
    description: 'User registration data',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() registerDto: RegisterRequestDto) {
    return await this.service.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    type: LoginRequestDto,
    description: 'User login data',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Credentials invalid' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(@Body() loginDto: LoginRequestDto) {
    return await this.service.login(loginDto);
  }
}
