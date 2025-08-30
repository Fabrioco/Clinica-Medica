import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return {
      data: await this.prisma.patient.findMany({
        include: { user: { omit: { password: true } } },
      }),
    };
  }

  async findById(id: number) {
    await this.verifyPatientExists(id);
    return this.prisma.patient.findUnique({
      where: { id },
      include: { user: { omit: { password: true } } },
    });
  }
  async create(data: CreatePatientDto) {
    await this.verifyUserExists(data.userId);
    await this.existingPatient(data.userId);
    return this.prisma.patient.create({ data });
  }
  async update(id: number, data: UpdatePatientDto) {
    await this.verifyPatientExists(id);
    return this.prisma.patient.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.verifyPatientExists(id);
    console.log(this.prisma.patient.delete({ where: { id } }));
    return this.prisma.patient.delete({ where: { id } });
  }

  private async verifyUserExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new ConflictException('User not found');
    }
  }

  private async verifyPatientExists(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      throw new ConflictException('Patient not found');
    }
  }

  private async existingPatient(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId: id },
    });
    if (patient) {
      throw new ConflictException('Patient already exists');
    }
  }
}
