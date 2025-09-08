import { Patient, PrismaClient } from '@prisma/client';

export async function patientSeeds() {
  const prisma = new PrismaClient();
  const patient: Patient = {
    id: 1,
    address: 'Rua das Flores, 123',
    birthDate: new Date('2000-01-01'),
    cpf: '123.456.789-00',
    healthPlan: 'Plano de Saúde',
    phone: '(11) 99999-9999',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await prisma.patient.create({ data: patient });
    console.log('Patient seeded successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
