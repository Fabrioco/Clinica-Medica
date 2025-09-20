import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return {
      data: await this.prisma.appointment.findMany(),
    };
  }

  async findOne(id: number) {
    await this.verifyAppointmentExists(id);
    return {
      data: await this.prisma.appointment.findUnique({ where: { id } }),
    };
  }

  async create(data: CreateAppointmentDto) {
    await this.verifyPatientExists(data.patientId);
    await this.verifyDoctorExists(data.doctorId);

    return {
      data: await this.prisma.appointment.create({ data }),
    };
  }

  async remove(id: number) {
    await this.verifyAppointmentExists(id);
    return {
      data: await this.prisma.appointment.delete({ where: { id } }),
    };
  }

  async update(id: number, data: UpdateAppointmentDto) {
    await this.verifyAppointmentExists(id);
    return {
      data: await this.prisma.appointment.update({ where: { id }, data }),
    };
  }

  private async verifyAppointmentExists(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
  }
  private async verifyPatientExists(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  }
  private async verifyDoctorExists(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  }
}
