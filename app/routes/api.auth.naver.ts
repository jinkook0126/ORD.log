import { type LoaderFunctionArgs } from 'react-router';

import { createAccessToken, createTempToken } from '~/lib/jwt';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return new Response('Bad Request', { status: 400 });
  }
  try {
    const naverResponse = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
    );
    const tokenData = await naverResponse.json();
    const userInfoResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    });
    const userNaverInfo = await userInfoResponse.json();
    const userResponse = await fetch(
      `${process.env.BASE_URL}/api/user?provider=naver&providerUserId=${userNaverInfo.response.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = await userResponse.json();
    if (user) {
      const accessToken = await createAccessToken(user.userId);
      return new Response(JSON.stringify({ isNewUser: false }), {
        headers: {
          'Set-Cookie': [
            `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`,
          ].join(', '),
          'Content-Type': 'application/json',
        },
      });
    } else {
      const tempToken = await createTempToken(
        userNaverInfo.response.id,
        userNaverInfo.response.email,
      );

      return Response.json({
        isNewUser: true,
        tempToken,
        thumbnailUrl: userNaverInfo.response.profile_image,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
