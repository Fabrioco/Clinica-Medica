import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateExamDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  patientId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  doctorId: number;

  @ApiProperty({
    example: 'Hemograma',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/result.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  resultFile?: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  resultDate: Date;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  appointmentId: number;
}
