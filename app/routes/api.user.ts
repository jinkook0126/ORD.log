import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';

import { getUserByNickname, getUserBySocialAccount, saveUserNickname } from '~/db/user';
import { createAccessToken, verifyTempToken } from '~/lib/jwt';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider');
  const providerUserId = url.searchParams.get('providerUserId');
  if (!provider || !providerUserId) {
    return new Response('Bad Request', { status: 400 });
  }
  const user = await getUserBySocialAccount(provider, providerUserId);
  return user;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const body = await request.json();
  const { nickname, tempToken, thumbnailUrl } = body;
  if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
    return new Response(JSON.stringify({ message: '닉네임을 입력해주세요.' }), { status: 400 });
  }
  try {
    const payload = await verifyTempToken(tempToken);
    if (!payload) {
      return new Response(JSON.stringify({ message: '잘못된 요청입니다.' }), { status: 400 });
    }
    const user = await getUserByNickname(nickname);
    if (user) {
      return new Response(JSON.stringify({ message: '닉네임이 이미 존재합니다.' }), {
        status: 400,
      });
    }
    const existingUser = await getUserBySocialAccount(payload.provider, payload.providerUserId);
    if (existingUser) {
      return new Response(JSON.stringify({ message: '이미 가입된 회원입니다.' }), { status: 400 });
    }
    const newUser = await saveUserNickname({
      nickname,
      providerUserId: payload.providerUserId,
      email: payload.email ?? '',
      provider: payload.provider,
      thumbnailUrl,
    });
    const accessToken = await createAccessToken(newUser.id);
    return new Response(null, {
      headers: {
        'Set-Cookie': [
          `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
        ].join(', '),
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: '서버 오류가 발생하였습니다.' }), {
      status: 500,
    });
  }
};
