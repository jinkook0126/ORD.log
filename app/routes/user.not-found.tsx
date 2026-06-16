import { UserX } from 'lucide-react';
import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'ORD.log - 유저를 찾을 수 없습니다' },
    { name: 'description', content: '존재하지 않거나 탈퇴한 유저입니다' },
  ];
}

export default function UserNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <UserX className="text-muted-foreground h-16 w-16" />
        <h1 className="text-2xl font-bold">유저를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground text-sm">존재하지 않거나 탈퇴한 유저입니다.</p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
