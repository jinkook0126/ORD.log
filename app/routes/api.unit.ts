import { getUnits } from '~/db/unit';

export const loader = async () => {
  const units = await getUnits();
  return Response.json(units);
};
