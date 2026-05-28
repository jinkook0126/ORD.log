import type { LoaderFunctionArgs } from 'react-router';

import { getSummary } from '~/db/my';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  if (!nickname) {
    return new Response('Bad Request', { status: 400 });
  }
  const summary = await getSummary({ nickname });
  return Response.json(summary);
}
