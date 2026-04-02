import { prisma } from '~/lib/prisma';

import { units } from './data/units';

async function main() {
  await prisma.unit.createMany({
    data: units,
    skipDuplicates: true,
  });
}

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
