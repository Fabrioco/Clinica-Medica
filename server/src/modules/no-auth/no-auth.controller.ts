import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { NoAuthService } from './no-auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('No Auth')
@Controller('no-auth')
export class NoAuthController {
  constructor(private readonly service: NoAuthService) {}
  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password step 1/2' })
  @ApiBody({ type: ForgotPasswordDto, required: true })
  @ApiOkResponse({ description: 'Code sent successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.service.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password step 2/2' })
  @ApiBody({
    type: ResetPasswordDto,
    required: true,
    description: 'Reset password data',
  })
  @ApiOkResponse({ description: 'Password reset successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.service.resetPassword(
      body.email,
      body.code,
      body.password,
      body.confirmPassword,
    );
  }
}
