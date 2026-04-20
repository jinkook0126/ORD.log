import type { ActionFunctionArgs } from 'react-router';

import { getUserId } from '~/lib/auth.server';
import { uploadFile } from '~/lib/storage.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const userId = await getUserId(request);
  console.log(userId);
  const body = await request.json();
  const { success, difficulty, unitIds, unitCount, score, photo } = body;
  console.log(photo);
  const imageUrl = await uploadFile(photo);
  // const log = await createLog({ success, difficulty, unitIds, unitCount, score, imageUrl, userId });
  // console.log(log);
  return Response.json({ success: true });
};
