import { useQueryClient } from '@tanstack/react-query';
import {
  ChevronRight,
  ClipboardList,
  LogInIcon,
  LogOutIcon,
  Menu,
  PenLine,
  ScrollText,
  Trophy,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useMe } from '~/query/user';

import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Separator } from '../ui/separator';
import { NavLink } from './NavLink';
const MobileMenu = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: me } = useMe();
  const isLoggedIn = !!me;
  const navigate = useNavigate();
  const onClose = () => setOpen(false);

  const onLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    queryClient.invalidateQueries({ queryKey: ['me'] });
    navigate('/');
  };
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Menu className="h-5 w-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Avatar className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white p-0">
                  <AvatarImage
                    src={me?.thumbnailUrl}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <DrawerTitle className="text-foreground text-base font-bold">
                    {me?.nickname}
                  </DrawerTitle>
                  <p className="text-muted-foreground text-xs">{me?.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <DrawerTitle className="text-foreground text-lg font-bold">
                  <NavLink to="/login" onClick={onClose}>
                    로그인을 해주세요
                  </NavLink>
                </DrawerTitle>
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <h2 className="text-foreground border-primary mt-4 mb-3 border-l-2 px-3 pl-2.5 text-sm font-bold">
          서비스
        </h2>
        <NavLink
          to="/clears"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          activeClassName="text-primary bg-secondary"
        >
          <ScrollText className="h-4 w-4" />
          <span>클리어</span>
        </NavLink>
        <NavLink
          to="/ranking"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          activeClassName="text-primary bg-secondary"
        >
          <Trophy className="h-4 w-4" />
          <span>랭킹</span>
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/clears/new"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
            activeClassName="text-primary bg-secondary"
          >
            <PenLine className="h-4 w-4" />
            <span>로그 등록</span>
          </NavLink>
        )}
        <Separator />
        {isLoggedIn && (
          <div>
            <h2 className="text-foreground border-primary mt-4 mb-3 border-l-2 px-3 pl-2.5 text-sm font-bold">
              내 정보
            </h2>
            <NavLink
              to={`/user/${me?.nickname}`}
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              activeClassName="text-primary bg-secondary"
            >
              <ClipboardList className="h-4 w-4" />
              <span>나의 로그</span>
            </NavLink>
          </div>
        )}
        <Separator />
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="text-destructive/80 hover:text-destructive flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <LogOutIcon className="h-4 w-4" />
            <span>로그아웃</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <LogInIcon className="h-4 w-4" />
            <span>로그인</span>
          </NavLink>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
