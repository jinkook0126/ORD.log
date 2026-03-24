import {
  ChevronDown,
  ClipboardList,
  LogIn,
  LogOut,
  Menu,
  PenLine,
  ScrollText,
  Trophy,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Badge } from '../ui/badge';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

const publicItems = [
  { title: '클리어', to: '/clears', icon: ScrollText },
  { title: '랭킹', to: '/ranking', icon: Trophy },
];

const guestItems = [{ title: '로그인', to: '/login', icon: LogIn }];

const authMenuItems = [{ title: '로그 등록', to: '/logs/new', icon: PenLine }];

const userMenuItems = [
  { title: '나의 로그', to: '/my-logs', icon: ClipboardList },
  { title: '로그아웃', to: '#', icon: LogOut, onClick: true },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="hover:ring-primary/50 relative overflow-hidden rounded-full transition-all hover:ring-2"
              >
                <Badge
                  variant="outline"
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full p-0"
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                </Badge>
                <ChevronDown
                  className={`bg-primary absolute -right-1 -bottom-1 h-3 w-3 rounded-full p-0.5 text-white transition-transform ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {userDropdownOpen && (
                <div className="bg-background border-border absolute top-full right-0 mt-1 w-48 rounded-md border shadow-lg">
                  {userMenuItems.map((item) => (
                    <div key={item.to}>
                      {item.onClick ? (
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setUserDropdownOpen(false);
                          }}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary flex w-full items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setUserDropdownOpen(false)}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
        <nav className="border-border bg-background absolute top-full right-0 left-0 z-40 border-b px-4 pt-2 pb-4 md:hidden">
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
          {isLoggedIn && (
            <>
              {userMenuItems.map((item) => (
                <div key={item.to}>
                  {item.onClick ? (
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setMobileOpen(false);
                      }}
                      className="text-muted-foreground hover:text-foreground flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                      activeClassName="text-primary bg-secondary"
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </>
          )}
        </nav>
      )}
    </header>
  );
};
export default NavBar;
