import { type LoaderFunctionArgs } from 'react-router';

const NAVER_CLIENT_SECRET = 'TODO';

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
    const res = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=FBJrVg1w1LoMKhYr2BRC&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
    );
    const data = await res.json();
    console.log(data);
    const res2 = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `${data.token_type} ${data.access_token}`,
      },
    });
    const data2 = await res2.json();
    console.log(data2);
    return true;
  } catch (error) {
    console.error(error);
  }
  return { code, state };
};
