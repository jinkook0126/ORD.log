import type { LoaderFunctionArgs } from 'react-router';

import type { TRankingType } from '~/db/ranking';
import { getRanking } from '~/db/ranking';
import type { Difficulty } from '~/lib/prismaClient';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const difficulty = url.searchParams.get('difficulty');
  const type = url.searchParams.get('type') as TRankingType;
  const page = url.searchParams.get('page');
  const items = await getRanking({
    difficulty: difficulty as Difficulty,
    type,
    page: page ? Number(page) : 1,
  });
  return Response.json({ items });
};
