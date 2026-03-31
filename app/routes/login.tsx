import { Card, CardContent } from '~/components/ui/card';

export function meta() {
  return [
    { title: 'ORD.log - 로그인' },
    { name: 'description', content: 'ORD.log에 로그인하세요' },
  ];
}

export default function Login() {
  const handleNaverLogin = async () => {
    console.log('Naver login clicked');
    const state = crypto.randomUUID();
    sessionStorage.setItem('oauth_state', state);

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=FBJrVg1w1LoMKhYr2BRC&state=${state}&redirect_uri=${encodeURIComponent(`${process.env.BASE_URL}/oauth`)}`;
  };

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.14),transparent_30%)]" />
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-xl items-center justify-center px-8 py-10 md:py-16">
        <Card className="border-border/80 bg-card/90 shadow-primary/10 w-full overflow-hidden rounded-4xl shadow-2xl backdrop-blur-xl">
          <CardContent className="p-0">
            <div className="border-border border-b px-6 py-5 md:px-8">
              <p className="text-muted-foreground font-mono text-xs tracking-[0.28em] uppercase">
                ORD.log Access
              </p>
            </div>

            <div className="space-y-8 px-6 py-10 md:px-10 md:py-12">
              <div className="space-y-3 text-center">
                <div className="bg-secondary text-secondary-foreground inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
                  <span className="bg-primary h-2 w-2 rounded-full" />
                  Social login only
                </div>
              </div>
              <button className="cursor-pointer" onClick={handleNaverLogin}>
                <img
                  src="/assets/NAVER_login_Light_KR_green_wide_H56.png"
                  alt="naver login"
                  className="h-auto w-full"
                />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
