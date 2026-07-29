import { getNotices } from '~/db/notice';

export const loader = async () => {
  const notices = await getNotices();
  return Response.json(notices);
};
