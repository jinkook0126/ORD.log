import type { LoaderFunctionArgs } from 'react-router';

import { getClears } from '~/db/clear';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const { items, nextCursor } = await getClears({ cursor: cursor ? Number(cursor) : undefined });
  return Response.json({ items, nextCursor });
};
