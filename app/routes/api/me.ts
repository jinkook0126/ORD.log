import type { LoaderFunctionArgs } from 'react-router';

import { getLoggedInUser } from '~/lib/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getLoggedInUser(request);
  if (!user) {
    return new Response(null, { status: 401 });
  }
  return Response.json(user);
}
