import type { LoaderFunctionArgs } from 'react-router';

import { getUserByNickname } from '~/db/user';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  if (!nickname) {
    return new Response(null, { status: 400 });
  }
  const user = await getUserByNickname(nickname);
  return Response.json(user);
};
