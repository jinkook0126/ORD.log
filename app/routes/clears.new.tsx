import { type LoaderFunctionArgs, redirect } from 'react-router';

import LogRegisterForm from '~/components/new/LogRegisterForm';
import { getLoggedInUser } from '~/lib/auth.server';

export function meta() {
  return [
    { title: 'ORD.log - 클리어 저장' },
    { name: 'description', content: '클리어 기록을 등록하세요' },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getLoggedInUser(request);

  if (!user) {
    return redirect('/login');
  }

  return { user };
}
const ClearsNew = () => {
  return (
    <main className="mx-auto max-w-5xl px-8 py-10 md:py-16">
      <div className="py-6">
        <h1 className="font-mono text-xl font-semibold">
          <span className="text-primary">&gt;</span> 클리어 저장
        </h1>
      </div>
      <LogRegisterForm />
    </main>
  );
};

export default ClearsNew;
