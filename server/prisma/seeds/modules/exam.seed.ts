import { Exam, PrismaClient } from '@prisma/client';

export async function examSeeds() {
  const prisma = new PrismaClient();

  const exam: Exam = {
    id: 1,
    appointmentId: 1,
    patientId: 1,
    doctorId: 1,
    name: 'Hemograma',
    resultFile: 'https://example.com/result.pdf',
    resultDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await prisma.exam.create({ data: exam });
    console.log('Exame seeded successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
