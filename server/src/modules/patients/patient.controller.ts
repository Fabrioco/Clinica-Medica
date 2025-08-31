import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { RolesGuard } from 'src/commons/guards/role.guard';
import { Roles } from 'src/commons/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('patients')
@ApiTags('Patient')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Get()
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Get all patients' })
  @ApiOkResponse({ type: [PatientDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Patient ID' })
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @Post()
  @ApiBody({ type: CreatePatientDto })
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Body() data: CreatePatientDto) {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Patient ID' })
  @ApiBody({ type: UpdatePatientDto })
  @ApiOperation({
    summary: 'Update a patient',
    description:
      'To update a patient, you do not need to pass the all items, only the ones that need to be updated.',
  })
  @ApiOkResponse({ type: PatientDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: string, @Body() data: UpdatePatientDto) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Patient ID' })
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiNoContentResponse({ description: 'No content' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
