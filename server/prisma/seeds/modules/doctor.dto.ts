import { Doctor } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export async function doctorSeeds() {
  const prisma = new PrismaClient();
  const doctor: Doctor = {
    id: 1,
    userId: 2,
    crm: '123456',
    phone: '(11) 99999-9999',
    specialty: 'Cardiologist',
    stripeAccountId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await prisma.doctor.create({ data: doctor });
    console.log('Doctor seeded successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
