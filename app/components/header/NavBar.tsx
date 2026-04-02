import { LogIn, PenLine, ScrollText, Trophy } from 'lucide-react';
import { Link } from 'react-router';

import { useMe } from '~/query/user';

import MobileMenu from './MobileMenu';
import { NavLink } from './NavLink';
import ProfileDropdown from './ProfileDropdown';
import { ThemeToggle } from './ThemeToggle';

const publicItems = [
  { title: '클리어', to: '/clears', icon: ScrollText },
  { title: '랭킹', to: '/ranking', icon: Trophy },
];

const guestItems = [{ title: '로그인', to: '/login', icon: LogIn }];

const authMenuItems = [{ title: '로그 등록', to: '/clears/new', icon: PenLine }];

const NavBar = () => {
  const { data: me } = useMe();

  const navItems = [...publicItems, ...(me ? authMenuItems : guestItems)];

  return (
    <header className="border-border bg-background/80 relative sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-8">
        <Link to="/" className="flex items-center font-mono text-lg font-bold tracking-tight">
          <span className="text-primary">ORD</span>
          <span className="text-muted-foreground">.log</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              activeClassName="text-primary bg-secondary"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
          {me && <ProfileDropdown />}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
export default NavBar;
