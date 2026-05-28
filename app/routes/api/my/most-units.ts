import { getMostUnits } from '~/db/my';

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  if (!nickname) {
    return Response.json({ error: 'Nickname is required' }, { status: 400 });
  }
  const mostUnits = await getMostUnits({ nickname });
  return Response.json(mostUnits);
};
