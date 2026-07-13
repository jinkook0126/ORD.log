import type { ActionFunctionArgs } from 'react-router';

import { getUserById, getUserByNickname, updateUserProfile } from '~/db/user';
import { getUserId } from '~/lib/auth.server';
import { deleteFile, getStoragePathFromPublicUrl, uploadFile } from '~/lib/storage.server';

const THUMBNAIL_BUCKET = 'user';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'PATCH') {
    return new Response('Method not allowed', { status: 405 });
  }

  let userId: number;
  try {
    userId = await getUserId(request);
  } catch {
    return new Response(JSON.stringify({ message: '로그인이 필요합니다.' }), { status: 401 });
  }

  const formData = await request.formData();
  const nickname = formData.get('nickname');
  const thumbnail = formData.get('thumbnail') as File | null;

  if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
    return new Response(JSON.stringify({ message: '닉네임을 입력해주세요.' }), { status: 400 });
  }
  if (nickname.length > 10) {
    return new Response(JSON.stringify({ message: '닉네임은 최대 10자입니다.' }), { status: 400 });
  }

  const existingUser = await getUserByNickname(nickname);
  if (existingUser && existingUser.id !== userId) {
    return new Response(JSON.stringify({ message: '이미 사용 중인 닉네임입니다.' }), {
      status: 400,
    });
  }

  try {
    let thumbnailUrl: string | undefined;
    if (thumbnail && thumbnail.size > 0) {
      const path = await uploadFile(thumbnail, THUMBNAIL_BUCKET);
      thumbnailUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${THUMBNAIL_BUCKET}/${path}`;
    }

    const currentUser = thumbnailUrl ? await getUserById(userId) : null;

    const updatedUser = await updateUserProfile({ userId, nickname, thumbnailUrl });

    const oldPath =
      currentUser?.thumbnailUrl &&
      getStoragePathFromPublicUrl(currentUser.thumbnailUrl, THUMBNAIL_BUCKET);
    if (oldPath) {
      await deleteFile(oldPath, THUMBNAIL_BUCKET).catch((error) => console.error(error));
    }

    return Response.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: '프로필 수정에 실패하였습니다.' }), {
      status: 500,
    });
  }
};
