import { type LoaderFunctionArgs, redirect } from 'react-router';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return redirect('/login');
  }
  try {
    const res = await fetch(`http://localhost:5174/api/auth/naver?code=${code}&state=${state}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  return { code, state };
};

const oauth = () => {
  return <div>oauth</div>;
};

export default oauth;
