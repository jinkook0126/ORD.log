import type { ActionFunctionArgs } from 'react-router';

import { getUserId } from '~/lib/auth.server';
import { uploadFile } from '~/lib/storage.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const userId = await getUserId(request);
  console.log(userId);
  const formData = await request.formData();
  const imageUrl = await uploadFile(formData.get('photo') as File);
  console.log(imageUrl);
  // const log = await createLog({ success, difficulty, unitIds, unitCount, score, imageUrl, userId });
  // console.log(log);
  return Response.json({ success: true });
};
