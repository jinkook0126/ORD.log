import { ClipboardList, LogOutIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { Avatar, AvatarImage } from '../ui/avatar';
const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white p-0">
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="profile"
            className="h-full w-full object-cover"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>닉네임</DropdownMenuLabel>
          <DropdownMenuItem>
            <ClipboardList />
            나의 로그
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
