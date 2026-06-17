import cookie from 'cookie';

import { getUserById } from '~/db/user';

import { verifyAccessToken } from './jwt';

export async function getUserId(request: Request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.accessToken;
  if (!token) throw new Error('Unauthorized');

  const decoded = await verifyAccessToken(token);
  return decoded.userId;
}

export async function getLoggedInUser(request: Request) {
  const cookie = request.headers.get('cookie') ?? '';

  const token = cookie
    .split('; ')
    .find((c) => c.startsWith('accessToken='))
    ?.split('=')[1];

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAccessToken(token);
    const user = await getUserById(payload.userId);

    return user ?? null;
  } catch {
    return null;
  }
}
