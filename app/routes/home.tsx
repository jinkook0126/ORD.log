import Logo from '~/components/main/Logo';
import { Ranking } from '~/components/main/Ranking';
import RecentClears from '~/components/main/RecentClears';
import SearchInput from '~/components/main/SearchInput';
import { useGetHomeQuery } from '~/query/home';

export function meta() {
  return [{ title: 'ORD.log' }, { name: 'description', content: '게임 클리어 기록을 검색하세요' }];
}

export default function () {
  const { data } = useGetHomeQuery();
  return (
    <main className="mx-auto max-w-4xl px-8">
      <section className="flex flex-col items-center gap-6 py-16">
        <Logo />
        <SearchInput />
      </section>
      <div className="grid gap-6 pb-12">
        <RecentClears data={data?.recentClears} />
        <Ranking god={data?.godRanking} nightmare={data?.nightmareRanking} />
      </div>
    </main>
  );
}
