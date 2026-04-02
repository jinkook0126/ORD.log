import { prisma } from '~/lib/prisma';

export const getUserBySocialAccount = async (provider: string, providerUserId: string) => {
  const user = await prisma.socialAccount.findUnique({
    where: {
      provider_providerUserId: {
        provider,
        providerUserId,
      },
    },
    include: {
      user: true,
    },
  });
  return user;
};

export const getUserByNickname = async (nickname: string) => {
  const user = await prisma.user.findUnique({
    where: {
      nickname,
    },
  });
  return user;
};

export const saveUserNickname = async ({
  nickname,
  providerUserId,
  email,
  provider,
  thumbnailUrl,
}: {
  nickname: string;
  providerUserId: string;
  email: string;
  provider: string;
  thumbnailUrl: string;
}) => {
  const newUser = await prisma.user.create({
    data: {
      nickname,
      email,
      thumbnailUrl,
    },
  });
  await prisma.socialAccount.create({
    data: {
      userId: newUser.id,
      provider,
      providerUserId,
    },
  });
  return newUser;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};
