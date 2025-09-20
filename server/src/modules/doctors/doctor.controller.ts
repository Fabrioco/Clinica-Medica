import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
import { DoctorsService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AuthGuard } from '../../commons/guards/auth.guard';
import { DoctorDto } from './dto/doctor';
import type { AuthRequest } from 'src/@types/user-request.type';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctor')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @ApiOperation({ summary: 'Find all doctors' })
  @ApiOkResponse({ description: 'List of doctors', type: [DoctorDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: 'Find doctor by id in Request',
    description: 'Doctor sees his data',
  })
  @ApiOkResponse({ description: 'Doctor found', type: DoctorDto })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('me')
  findById(@Req() req: AuthRequest) {
    return this.service.findById(req.user.id);
  }

  @ApiOperation({ summary: 'Find doctor by id' })
  @ApiOkResponse({ description: 'Doctor found', type: DoctorDto })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':doctorId')
  findDoctorById(@Param('doctorId') id: string) {
    return this.service.findDoctorById(Number(id));
  }

  @ApiOperation({ summary: 'Create a doctor' })
  @ApiCreatedResponse({ description: 'Doctor created', type: DoctorDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateDoctorDto })
  @Post()
  create(@Body() data: CreateDoctorDto, @Req() req: AuthRequest) {
    return this.service.create(data, req.user.id);
  }

  @ApiOperation({
    summary: 'Doctor can update his data',
    description:
      'To update doctor you do not need to send all fields, only the ones you want to update',
  })
  @ApiOkResponse({ description: 'Doctor updated', type: DoctorDto })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: UpdateDoctorDto })
  @Patch('me')
  update(@Body() data: UpdateDoctorDto, @Req() req: AuthRequest) {
    return this.service.update(data, req.user.id);
  }

  @ApiOperation({
    summary: 'Delete a doctor',
    description: 'Only the doctor can delete his data',
  })
  @ApiOperation({ summary: 'Delete a doctor' })
  @ApiOkResponse({ description: 'Doctor deleted' })
  @ApiNotFoundResponse({ description: 'Doctor not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('me')
  remove(@Req() req: AuthRequest) {
    return this.service.remove(req.user.id);
  }
}
