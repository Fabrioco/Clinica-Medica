import { PrismaClient, Role, User } from '@prisma/client';
import { PasswordHelperUtils } from '../../../src/utils/password.helper';

export async function usersSeeds() {
  const passwordHelper = new PasswordHelperUtils();
  const prisma = new PrismaClient();

  const users: User[] = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@example.com',
      password: '',
      role: Role.admin,
      createdAt: new Date(),
      updatedAt: new Date(),
      code: null,
      expiresAt: null,
    },
    {
      id: 2,
      name: 'Doctor 1',
      email: 'doctor@example.com',
      password: '',
      role: Role.doctor,
      createdAt: new Date(),
      updatedAt: new Date(),
      code: null,
      expiresAt: null,
    },
    {
      id: 3,
      name: 'Patient 1',
      email: 'patient@example.com',
      password: '',
      role: Role.patient,
      createdAt: new Date(),
      updatedAt: new Date(),
      code: null,
      expiresAt: null,
    },
  ];

  for (const user of users) {
    try {
      user.password = await passwordHelper.hashPassword('User@123');
      await prisma.user.create({ data: user });
      console.log(`User ${user.name} created successfully`);
    } catch (e) {
      console.log(e);
    }
  }

  await prisma.$disconnect();
}
