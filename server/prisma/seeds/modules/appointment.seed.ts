import { Appointment, AppointmentStatus, PrismaClient } from '@prisma/client';

export async function appointmentSeeds() {
  const prisma = new PrismaClient();

  const appointment: Appointment = {
    id: 1,
    patientId: 1,
    doctorId: 1,
    status: AppointmentStatus.scheduled,
    appointmentDate: new Date(),
    notes: 'Some notes',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await prisma.appointment.create({ data: appointment });
    console.log('Appointment seeded successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
