import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentDto } from './dto/appointment.dto';
import { AuthGuard } from '../../commons/guards/auth.guard';

@Controller('appointments')
@ApiTags('Appointment')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiOkResponse({
    type: [AppointmentDto],
  })
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by id' })
  @ApiOkResponse({ type: AppointmentDto })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiOkResponse({ type: AppointmentDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async create(@Body() data: CreateAppointmentDto) {
    return this.appointmentsService.create(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiOkResponse({ type: AppointmentDto })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  async remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiOkResponse({ type: AppointmentDto })
  @ApiNotFoundResponse({ description: 'Appointment not found' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async update(@Param('id') id: string, @Body() data: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, data);
  }
}
