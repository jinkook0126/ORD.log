import { index, type RouteConfig } from '@react-router/dev/routes';
import { route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('clears', 'routes/clears.tsx'),
  route('clears/new', 'routes/clears.new.tsx'),
  route('ranking', 'routes/ranking.tsx'),
  route('user/:nickname', 'routes/user.$nickname.tsx'),
  route('oauth', 'routes/oauth.tsx'),
  route('oauth/nickname', 'routes/oauth.nickname.tsx'),
  route('api/auth/naver', 'routes/api/auth.naver.ts'),
  route('api/user', 'routes/api/user.ts'),
  route('api/me', 'routes/api/me.ts'),
  route('api/unit', 'routes/api/unit.ts'),
  route('api/log', 'routes/api/log.ts'),
  route('api/home', 'routes/api/home.ts'),
  route('api/clears', 'routes/api/clear.ts'),
  route('api/ranking', 'routes/api/ranking.ts'),
  route('api/my/summary', 'routes/api/my/summary.ts'),
  route('api/my/ranking', 'routes/api/my/ranking.ts'),
  route('api/my/difficulty', 'routes/api/my/difficulty.ts'),
  route('api/my/most-units', 'routes/api/my/most-units.ts'),
  route('api/my/game-records', 'routes/api/my/game-records.ts'),
] satisfies RouteConfig;
