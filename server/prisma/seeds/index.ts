import { appointmentSeeds } from './modules/appointment.seed';
import { doctorSeeds } from './modules/doctor.seed';
import { patientSeeds } from './modules/patient.seed';
import { usersSeeds } from './modules/users.seed';

async function main() {
  await usersSeeds();
  await patientSeeds();
  await doctorSeeds();
  await appointmentSeeds();
}

main();
