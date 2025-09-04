import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateExamDto } from './create-exam.dto';
import { Type } from 'class-transformer';

export class UpdateExamDto extends PartialType(CreateExamDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  patientId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  doctorId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  resultFile?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  resultDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  appointmentId?: number;
}
