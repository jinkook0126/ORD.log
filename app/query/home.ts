import { useQuery } from '@tanstack/react-query';

const useGetHomeQuery = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const res = await fetch('/api/home');
      return res.json();
    },
    staleTime: 0,
    refetchOnMount: true,
  });
};

export { useGetHomeQuery };
