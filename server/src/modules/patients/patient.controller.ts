import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from '../../commons/guards/auth.guard';
import type { AuthRequest } from '../../@types/user-request.type';

@Controller('patients')
@ApiTags('Patient')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiOkResponse({ type: [PatientDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.service.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Patient get his data' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findById(@Req() req: AuthRequest) {
    return this.service.findById(Number(req.user.id));
  }

  @Post()
  @ApiBody({ type: CreatePatientDto })
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() data: CreatePatientDto, @Req() req: AuthRequest) {
    return this.service.create(data, Number(req.user.id));
  }

  @Patch('me')
  @ApiBody({ type: UpdatePatientDto })
  @ApiOperation({
    summary: 'Update data of one patient',
    description:
      'To update a patient, you do not need to pass the all items, only the ones that need to be updated.',
  })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Req() req: AuthRequest, @Body() data: UpdatePatientDto) {
    return this.service.update(Number(req.user.id), data);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Patient delete his data' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Req() req: AuthRequest) {
    return this.service.remove(Number(req.user.id));
  }

  @Get(':patientId')
  @ApiOperation({ summary: 'Get one patient' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findPatientById(@Param('patientId') id: string) {
    return this.service.findPatientById(Number(id));
  }
}
