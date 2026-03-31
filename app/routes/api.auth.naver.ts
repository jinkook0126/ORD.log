import { type LoaderFunctionArgs } from 'react-router';

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
    const userInfo = await userInfoResponse.json();
    console.log(userInfo);

    const foo = await fetch(
      `${process.env.BASE_URL}/api/user?provider=naver&providerUserId=${userInfo.response.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const fooData = await foo.json();
    console.log(fooData);
    return true;
  } catch (error) {
    console.error(error);
  }
  return { code, state };
};
