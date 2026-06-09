import type { Difficulty } from 'generated/prisma/enums';
import type { LoaderFunctionArgs } from 'react-router';

import { getUnitSummary } from '~/db/my';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  const difficulty = url.searchParams.get('difficulty') as Difficulty | undefined;
  if (!nickname) {
    return new Response('Bad Request', { status: 400 });
  }
  const data = await getUnitSummary({ nickname, difficulty });
  return Response.json(data);
};
