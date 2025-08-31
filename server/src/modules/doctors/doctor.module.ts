import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DoctorsController } from './doctor.controller';
import { DoctorsService } from './doctor.service';

@Module({
  imports: [JwtModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [],
})
export class DoctorsModule {}
