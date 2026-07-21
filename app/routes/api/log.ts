import type { Difficulty } from 'generated/prisma/enums';
import type { ActionFunctionArgs } from 'react-router';

import { createLog, deleteLog } from '~/db/log';
import { getUserId } from '~/lib/auth.server';
import { deleteFile, uploadFile } from '~/lib/storage.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === 'DELETE') {
    let userId: number;
    try {
      userId = await getUserId(request);
    } catch {
      return new Response(JSON.stringify({ message: '로그인이 필요합니다.' }), { status: 401 });
    }

    const logId = Number(new URL(request.url).searchParams.get('id'));
    if (!Number.isInteger(logId) || logId <= 0) {
      return new Response(JSON.stringify({ message: '올바른 로그 ID가 아닙니다.' }), {
        status: 400,
      });
    }

    try {
      const deletedLog = await deleteLog({ userId, logId });
      if (!deletedLog) {
        return new Response(
          JSON.stringify({ message: '로그를 찾을 수 없거나 삭제 권한이 없습니다.' }),
          {
            status: 404,
          },
        );
      }

      if (deletedLog.imageUrl) {
        await deleteFile(deletedLog.imageUrl, 'screen').catch((error) => console.error(error));
      }
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: '로그 삭제에 실패했습니다.' }), {
        status: 500,
      });
    }
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const userId = await getUserId(request);
  const formData = await request.formData();
  const photo = formData.get('photo') as File | null;
  const imageUrl = photo && photo.size > 0 ? await uploadFile(photo, 'screen') : null;
  const data = {
    success: formData.get('success') === 'true',
    difficulty: formData.get('difficulty') as Difficulty,
    unitIds: (formData.get('unitIds') as string).split(',').map(Number),
    unitCount: Number(formData.get('unitCount')),
    score: Number(formData.get('score')),
    imageUrl,
    userId,
  };
  await createLog(data);
  return Response.json({ success: true });
};
