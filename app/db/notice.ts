import { prisma } from '~/lib/prisma';

export const getNotices = async () => {
  return prisma.notice.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
