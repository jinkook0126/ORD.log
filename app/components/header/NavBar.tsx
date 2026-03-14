import { LogIn, Menu, ScrollText, Trophy, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { title: '클리어', to: '/clears', icon: ScrollText },
  { title: '랭킹', to: '/ranking', icon: Trophy },
  { title: '로그인', to: '/login', icon: LogIn },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
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
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-border bg-background border-t px-4 pt-2 pb-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              activeClassName="text-primary bg-secondary"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
export default NavBar;
