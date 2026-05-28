import type { LoaderFunctionArgs } from 'react-router';

import { getDifficultySummary } from '~/db/my';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  if (!nickname) {
    return new Response('Bad Request', { status: 400 });
  }
  const data = await getDifficultySummary({ nickname });
  return Response.json(data);
};
