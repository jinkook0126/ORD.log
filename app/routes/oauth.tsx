import { Loader2 } from 'lucide-react';
import { type LoaderFunctionArgs, redirect, useNavigation } from 'react-router';

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
    if (data.isNewUser) {
      return redirect(`/oauth/nickname?tempToken=${data.tempToken}`);
    } else {
      return redirect('/');
    }
  } catch (error) {
    console.error(error);
    return redirect('/login');
  }
};

const OAuth = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary animate-spin" size={48} />
          <p className="text-muted-foreground text-sm">로그인 처리 중...</p>
        </div>
      )}
    </div>
  );
};

export default OAuth;
