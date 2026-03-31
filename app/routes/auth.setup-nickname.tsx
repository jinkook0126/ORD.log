import { useState } from 'react';
import { type ActionFunctionArgs, redirect } from 'react-router';

import { Card, CardContent } from '~/components/ui/card';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return { error: 'Method not allowed' };
  }

  const formData = await request.formData();
  const nickname = formData.get('nickname');

  if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
    return { error: '닉네임을 입력해주세요' };
  }

  // TODO: 닉네임 저장 로직 (데이터베이스에 저장)
  // const response = await savUserNickname(nickname);

  console.log('Nickname saved:', nickname);

  // 홈으로 리다이렉트
  return redirect('/');
};

export default function SetupNickname() {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // form submit는 자동으로 action 함수를 호출합니다
  };

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.14),transparent_30%)]" />
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-xl items-center justify-center px-8 py-10 md:py-16">
        <Card className="border-border/80 bg-card/90 shadow-primary/10 w-full overflow-hidden rounded-4xl shadow-2xl backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="border-border border-b px-6 py-5 md:px-8">
              <p className="text-muted-foreground font-mono text-xs tracking-[0.28em] uppercase">
                Set Your Nickname
              </p>
            </div>

            <div className="space-y-8 px-6 py-10 md:px-10 md:py-12">
              <div className="space-y-3 text-center">
                <h1 className="text-foreground text-2xl font-bold">별명을 입력해주세요</h1>
                <p className="text-muted-foreground text-sm">
                  다른 사용자들이 당신을 찾을 때 사용될 이름입니다
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    name="nickname"
                    placeholder="닉네임을 입력하세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={20}
                    className="border-border/50 bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition outline-none focus:ring-2"
                    disabled={isLoading}
                    required
                  />
                  <p className="text-muted-foreground text-xs">{nickname.length}/20</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || nickname.trim().length === 0}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? '저장 중...' : '시작하기'}
                </button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
