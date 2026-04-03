import { prisma } from '~/lib/prisma';

export const getUnits = async () => {
  const units = await prisma.unit.findMany({ include: { grade: true } });
  return units;
};
