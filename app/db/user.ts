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
