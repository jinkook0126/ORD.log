import { Search } from 'lucide-react';

import { Input } from '~/components/ui/input';

const SearchInput = () => {
  return (
    <div className="relative w-full max-w-lg">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="플레이어, 게임, 기록 검색..."
        className="bg-secondary border-border focus-visible:ring-primary glow-primary h-11 pl-10 font-mono text-sm"
      />
    </div>
  );
};
export default SearchInput;
