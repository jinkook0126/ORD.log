import { ClipboardList, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router';

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
