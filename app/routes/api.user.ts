import type { LoaderFunctionArgs } from 'react-router';

import { getUserBySocialAccount } from '~/db/user';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  const providerUserId = url.searchParams.get('providerUserId');
  if (!provider || !providerUserId) {
    return new Response('Bad Request', { status: 400 });
  }
  const user = await getUserBySocialAccount(provider, providerUserId);
  return user;
};
