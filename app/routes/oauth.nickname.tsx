import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Card, CardContent } from '~/components/ui/card';
import SignUpForm from '~/components/user/SignUpForm';

export default function SetupNickname() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tempToken = state?.tempToken as string | undefined;

  useEffect(() => {
    if (!tempToken) {
      navigate('/login', { replace: true });
    }
  }, [tempToken, navigate]);

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
                <h1 className="text-foreground text-2xl font-bold">닉네임을 입력해주세요</h1>
                <p className="text-muted-foreground text-sm">
                  다른 사용자들이 당신을 찾을 때 사용될 이름입니다
                </p>
              </div>

              {tempToken && <SignUpForm tempToken={tempToken} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
