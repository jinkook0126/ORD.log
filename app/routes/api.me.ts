import type { LoaderFunctionArgs } from 'react-router';

import { getUserById } from '~/db/user';
import { verifyAccessToken } from '~/lib/jwt';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get('cookie') || '';

  const token = cookie
    .split('; ')
    .find((c) => c.startsWith('accessToken='))
    ?.split('=')[1];

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    const payload = await verifyAccessToken(token);
    const user = await getUserById(payload.userId);
    if (!user) {
      return new Response(null, { status: 401 });
    }
    return Response.json(user);
  } catch {
    return new Response(null, { status: 401 });
  }
}
