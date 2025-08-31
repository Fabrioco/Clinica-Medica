import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PatientModule } from './patients/patient.module';

@Module({
  imports: [
    AuthModule,
    PatientModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
