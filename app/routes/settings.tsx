import { type LoaderFunctionArgs, redirect } from 'react-router';

import ProfileEditForm from '~/components/settings/ProfileEditForm';
import { getLoggedInUser } from '~/lib/auth.server';

export function meta() {
  return [
    { title: 'ORD.log - 내 정보 변경' },
    { name: 'description', content: '닉네임과 프로필 이미지를 변경하세요' },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getLoggedInUser(request);

  if (!user) {
    return redirect('/login');
  }

  return { user };
}

const Settings = () => {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-8 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <span className="text-primary font-mono">&gt;</span> 내 정보 변경
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          닉네임과 프로필 이미지를 변경할 수 있습니다.
        </p>
      </div>
      <div className="border-border bg-card rounded-lg border p-4 sm:p-8">
        <ProfileEditForm />
      </div>
    </main>
  );
};

export default Settings;
