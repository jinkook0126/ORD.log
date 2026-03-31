import { type LoaderFunctionArgs, redirect } from 'react-router';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return redirect('/login');
  }
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/auth/naver?code=${code}&state=${state}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    // TODO: 사용자가 기존 사용자인지 확인
    // 새 사용자면 닉네임 설정 페이지로, 기존 사용자면 홈으로 리다이렉트
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }

  // 닉네임 입력 페이지로 리다이렉트
  return redirect('/auth/setup-nickname');
};

const oauth = () => {
  return <div>oauth</div>;
};

export default oauth;
