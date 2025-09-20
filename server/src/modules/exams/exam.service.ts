import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return { data: await this.prisma.exam.findMany() };
  }

  async findOne(id: number) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async create(data: CreateExamDto) {
    await this.verifyPatientExists(data.patientId);
    await this.verifyDoctorExists(data.doctorId);
    await this.verifyAppointmentExists(data.appointmentId);
    return await this.prisma.exam.create({ data });
  }

  async delete(id: number) {
    await this.verifyExamExists(id);
    return await this.prisma.exam.delete({ where: { id } });
  }

  async update(id: number, data: UpdateExamDto, userId: number) {
    await this.verifyExamExists(id);
    if (data.patientId) {
      await this.verifyPatientExists(data.patientId);
    }

    await this.verifyDoctorExists(userId);
    if (data.appointmentId) {
      await this.verifyAppointmentExists(data.appointmentId);
    }
    return await this.prisma.exam.update({ where: { id }, data });
  }

  async findExamsByPatientId(patientId: number) {
    await this.verifyPatientExists(patientId);
    return {
      data: await this.prisma.exam.findMany({ where: { patientId } }),
    };
  }

  async findExamsByDoctorId(doctorId: number) {
    await this.verifyDoctorExists(doctorId);
    return {
      data: await this.prisma.exam.findMany({ where: { doctorId } }),
    };
  }

  private async verifyPatientExists(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
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

  private async verifyAppointmentExists(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
  }

  private async verifyExamExists(id: number) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
  }
}
