import { useQueryClient } from '@tanstack/react-query';
import { ClipboardList, LogOutIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useMe } from '~/query/user';

import { Avatar, AvatarImage } from '../ui/avatar';
const ProfileDropdown = () => {
  const { data: me } = useMe();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    queryClient.invalidateQueries({ queryKey: ['me'] });
    navigate('/');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white p-0">
          <AvatarImage
            src={me?.thumbnailUrl}
            alt="profile"
            className="h-full w-full object-cover"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{me?.nickname}</DropdownMenuLabel>
          <DropdownMenuItem>
            <ClipboardList />
            <Link to={`/user/${me?.nickname}`}>나의 로그</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={onLogout}>
            <LogOutIcon />
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
