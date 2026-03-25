import { LogIn, PenLine, ScrollText, Trophy } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import MobileMenu from './MobileMenu';
import { NavLink } from './NavLink';
import ProfileDropdown from './ProfileDropdown';
import { ThemeToggle } from './ThemeToggle';

const publicItems = [
  { title: '클리어', to: '/clears', icon: ScrollText },
  { title: '랭킹', to: '/ranking', icon: Trophy },
];

const guestItems = [{ title: '로그인', to: '/login', icon: LogIn }];

const authMenuItems = [{ title: '로그 등록', to: '/logs/new', icon: PenLine }];

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [...publicItems, ...(isLoggedIn ? authMenuItems : guestItems)];

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
          {isLoggedIn && <ProfileDropdown />}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-xs font-medium transition-colors"
            title={isLoggedIn ? '로그아웃' : '로그인 토글'}
          >
            {isLoggedIn ? '로그인됨' : '로그인 토글'}
          </button>
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
