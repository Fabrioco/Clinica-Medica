import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Role } from '@prisma/client';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return {
      data: await this.prisma.doctor.findMany({
        include: { user: { omit: { password: true } } },
      }),
    };
  }

  async findById(id: number) {
    await this.verifyDoctorExists(id);
    return this.prisma.doctor.findUnique({
      where: { userId: id },
      include: { user: { omit: { password: true } } },
    });
  }

  async create(data: CreateDoctorDto, id: number) {
    await this.verifyCRMExists(data.crm);
    await this.updateRoleToDoctor(id);
    return this.prisma.doctor.create({
      data: {
        userId: id,
        ...data,
      },
    });
  }

  async update(data: UpdateDoctorDto, doctorId: number) {
    await this.verifyDoctorExists(doctorId);

    if (data.crm) {
      await this.verifyCRMExists(data.crm);
    }

    return this.prisma.doctor.update({
      where: { userId: doctorId },
      data,
    });
  }

  async remove(doctorId: number) {
    await this.verifyDoctorExists(doctorId);
    await this.updateRoleToPatient(doctorId);
    return this.prisma.doctor.delete({ where: { userId: doctorId } });
  }

  async findDoctorById(id: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return this.prisma.doctor.findUnique({
      where: { id },
      include: { user: { omit: { password: true } } },
    });
  }

  private async verifyDoctorExists(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: id },
    });
    if (!doctor) {
      if (!doctor) throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  private async verifyCRMExists(crm: string) {
    const existing = await this.prisma.doctor.findUnique({
      where: { crm },
    });
    if (existing) {
      throw new ConflictException('Exists a doctor with this CRM');
    }
  }

  private async updateRoleToDoctor(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { role: Role.doctor },
    });
  }

  private async updateRoleToPatient(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { role: Role.patient },
    });
  }
}
