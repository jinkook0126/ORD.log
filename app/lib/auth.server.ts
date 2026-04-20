import cookie from 'cookie';

import { verifyAccessToken } from './jwt';

export async function getUserId(request: Request) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.accessToken;
  if (!token) throw new Error('Unauthorized');

  const decoded = await verifyAccessToken(token);
  return decoded.userId;
}
