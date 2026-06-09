import { prisma } from '~/lib/prisma';
import type { Prisma } from '~/lib/prismaClient';

export type TUnit = Prisma.UnitGetPayload<{
  include: {
    grade: true;
  };
}>;
export const getUnits = async () => {
  const units = await prisma.unit.findMany({ include: { grade: true } });
  return units;
};
