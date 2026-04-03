import { prisma } from '~/lib/prisma';

import { units } from './data/units';

async function main() {
  console.log(process.env.DATABASE_URL);

  await prisma.unit.createMany({
    data: units,
    skipDuplicates: true,
  });
}
console.log('🌱 Seed 시작');
main()
  .then(() => {
    console.log('🌱 Seed 완료');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
