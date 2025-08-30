import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import type { Request } from 'express';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

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

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({
    description: 'The current user',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async me(@Req() req: Request) {
    if (!req?.user) {
      throw new ConflictException('User not found');
    }
    return await this.service.me(req?.user.id);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password step 1/3' })
  @ApiBody({ type: ForgotPasswordDto, required: true })
  @ApiOkResponse({ description: 'Code sent successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.service.forgotPassword(body.email);
  }
}
