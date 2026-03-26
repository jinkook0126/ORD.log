import { index, type RouteConfig } from '@react-router/dev/routes';
import { route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('clears', 'routes/clears.tsx'),
  route('ranking', 'routes/ranking.tsx'),
  route('user/:nickname', 'routes/user.$nickname.tsx'),
] satisfies RouteConfig;
