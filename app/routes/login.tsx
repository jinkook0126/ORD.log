import { Button } from '~/components/ui/button';

export function meta() {
  return [
    { title: 'ORD.log - 로그인' },
    { name: 'description', content: 'ORD.log에 로그인하세요' },
  ];
}

export default function Login() {
  const handleNaverLogin = () => {
    // TODO: 네이버 OAuth 인증 로직 구현
    console.log('Naver login clicked');
  };

  return (
    <main className="from-background to-background/95 flex min-h-[calc(100vh-56px)] items-center justify-center bg-gradient-to-br px-4 py-8 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* 로고 및 제목 */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#6d5fe8] to-[#8b7dff] bg-clip-text text-transparent">
                ORD
              </span>
              <span className="text-muted-foreground">.log</span>
            </div>
          </div>
          <h2 className="text-foreground mb-2 text-xl font-semibold">로그인</h2>
          <p className="text-muted-foreground text-sm">오목 랭킹 로그에 접속하세요</p>
        </div>

        {/* 로그인 버튼 영역 */}
        <div className="border-border/40 bg-card/50 space-y-3 rounded-lg border p-6 backdrop-blur-sm">
          <Button
            onClick={handleNaverLogin}
            className="h-12 w-full bg-[#00C73C] text-base font-semibold text-white transition-all duration-200 hover:bg-[#00AA2E] hover:shadow-lg active:scale-95"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.334 2H7.667C4.553 2 2 4.554 2 7.666v8.668C2 19.446 4.553 22 7.666 22h8.668C19.447 22 22 19.446 22 16.334V7.666C22 4.554 19.447 2 16.334 2zm-3.667 13.5h-2V8h2v7.5z" />
            </svg>
            네이버로 로그인
          </Button>
        </div>

        {/* 하단 안내 텍스트 */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs leading-relaxed">
            로그인을 통해 기록을 저장하고
            <br />
            랭킹에 참여할 수 있습니다.
          </p>
        </div>

        {/* 하단 링크 */}
        <div className="border-border/30 mt-6 flex items-center justify-center gap-4 border-t pt-6">
          <button className="text-muted-foreground hover:text-foreground text-xs transition-colors">
            고객센터
          </button>
          <span className="text-border/50">•</span>
          <button className="text-muted-foreground hover:text-foreground text-xs transition-colors">
            광고 문의
          </button>
        </div>
      </div>
    </main>
  );
}
