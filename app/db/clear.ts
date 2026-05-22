import { prisma } from '~/lib/prisma';
import type { Prisma } from '~/lib/prismaClient';
const PAGE_SIZE = 20;

export type TClearItem = Prisma.GameRecordGetPayload<{
  include: {
    user: true;
    units: {
      include: {
        unit: true;
      };
    };
  };
}>;
export const getClears = async ({ cursor }: { cursor?: number }) => {
  const items = await prisma.gameRecord.findMany({
    where: {
      success: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        id: 'desc',
      },
    ],
    include: {
      user: true,
      units: {
        include: {
          unit: {
            select: {
              id: true,
              thumbnailUrl: true,
              name: true,
            },
          },
        },
      },
    },
    take: PAGE_SIZE + 1,
    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
  });

  let nextCursor: number | undefined;

  if (items.length > PAGE_SIZE) {
    const nextItem = items.pop();
    nextCursor = nextItem?.id;
  }

  return {
    items,
    nextCursor,
  };
};
