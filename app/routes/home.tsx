import Logo from '~/components/main/Logo';
import { Ranking } from '~/components/main/Ranking';
import RecentClears from '~/components/main/RecentClears';
import SearchInput from '~/components/main/SearchInput';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function () {
  return (
    <main className="mx-auto max-w-4xl px-8">
      <section className="flex flex-col items-center gap-6 py-16">
        <Logo />
        <SearchInput />
      </section>
      <div className="grid gap-6 pb-12">
        <RecentClears />
        <Ranking />
      </div>
    </main>
  );
}
