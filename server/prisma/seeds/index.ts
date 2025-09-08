import { patientSeeds } from './modules/patient.seed';
import { usersSeeds } from './modules/users.seed';

async function main() {
  await usersSeeds();
  await patientSeeds();
}

main();
