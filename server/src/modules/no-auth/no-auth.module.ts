import { Module } from '@nestjs/common';
import { NoAuthController } from './no-auth.controller';
import { NoAuthService } from './no-auth.service';
import { PasswordHelperUtils } from 'src/utils/password.helper';

@Module({
  controllers: [NoAuthController],
  providers: [NoAuthService, PasswordHelperUtils],
  exports: [],
})
export class NoAuthModule {}
