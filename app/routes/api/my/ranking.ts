import type { LoaderFunctionArgs } from 'react-router';

import { getRanking } from '~/db/my';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  if (!nickname) {
    return new Response('Bad Request', { status: 400 });
  }
  const ranking = await getRanking({ nickname });
  return Response.json(ranking);
};
