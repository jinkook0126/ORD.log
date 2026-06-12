import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Input } from '~/components/ui/input';

const SearchInput = () => {
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.trim() && (e.nativeEvent as KeyboardEvent).key === 'Enter') {
      navigate(`/user/${value}`);
    }
  };
  return (
    <div className="relative w-full max-w-lg">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="플레이어 기록 검색..."
        className="bg-secondary border-border focus-visible:ring-primary glow-primary h-11 pl-10 font-mono text-sm"
        onKeyDown={handleSearch}
      />
    </div>
  );
};
export default SearchInput;
