import { useQuery } from '@tanstack/react-query';

const useGetUnitsQuery = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const res = await fetch('/api/unit');
      return res.json();
    },
  });
};

export { useGetUnitsQuery };
