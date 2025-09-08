import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import type { AuthRequest } from 'src/@types/user-request.type';
import { RolesGuard } from 'src/commons/guards/role.guard';

@ApiTags('Exam')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('exams')
export class ExamController {
  constructor(private readonly service: ExamService) {}

  @ApiOperation({ summary: 'Find all exams' })
  @ApiOkResponse({ description: 'List of exams', type: [CreateExamDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Find exam by id' })
  @ApiOkResponse({ description: 'Exam found', type: CreateExamDto })
  @ApiNotFoundResponse({ description: 'Exam not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Create an exam' })
  @ApiCreatedResponse({ description: 'Exam created', type: CreateExamDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateExamDto })
  @Post()
  create(@Body() data: CreateExamDto) {
    return this.service.create(data);
  }

  @ApiOperation({ summary: 'Update an exam' })
  @ApiOkResponse({ description: 'Exam updated', type: CreateExamDto })
  @ApiNotFoundResponse({ description: 'Exam not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateExamDto })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: CreateExamDto,
    @Req() req: AuthRequest,
  ) {
    return this.service.update(id, data, req.user.id);
  }

  @ApiOperation({ summary: 'Delete an exam' })
  @ApiOkResponse({ description: 'Exam deleted' })
  @ApiNotFoundResponse({ description: 'Exam not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Find all exams by patient id' })
  @ApiOkResponse({ description: 'List of exams', type: [CreateExamDto] })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiParam({ name: 'patientId', type: Number })
  @Get('patient/:patientId')
  findExamsByPatientId(@Param('patientId') patientId: number) {
    return this.service.findExamsByPatientId(patientId);
  }
}
