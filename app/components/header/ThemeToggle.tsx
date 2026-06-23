import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTheme } from '~/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="text-muted-foreground rounded-md p-2" aria-label="Toggle theme" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
