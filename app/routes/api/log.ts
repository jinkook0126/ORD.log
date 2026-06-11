import type { Difficulty } from 'generated/prisma/enums';
import type { ActionFunctionArgs } from 'react-router';

import { createLog } from '~/db/log';
import { getUserId } from '~/lib/auth.server';
import { uploadFile } from '~/lib/storage.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const userId = await getUserId(request);
  const formData = await request.formData();
  const photo = formData.get('photo') as File | null;
  const imageUrl = photo && photo.size > 0 ? await uploadFile(photo) : null;
  const data = {
    success: formData.get('success') === 'true',
    difficulty: formData.get('difficulty') as Difficulty,
    unitIds: (formData.get('unitIds') as string).split(',').map(Number),
    unitCount: Number(formData.get('unitCount')),
    score: Number(formData.get('score')),
    imageUrl,
    userId,
  };
  const log = await createLog(data);
  return Response.json({ success: true });
};
