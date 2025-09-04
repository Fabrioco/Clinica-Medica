import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

@Module({
  imports: [JwtModule],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
