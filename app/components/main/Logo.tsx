import { useEffect, useState } from 'react';

const TYPING_TEXT = '게임 클리어 기록을 검색하세요';

const Logo = () => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let i = 0;
    let isDeleting = false;

    const tick = () => {
      if (!isDeleting) {
        i++;
        setDisplayText(TYPING_TEXT.slice(0, i));
        if (i >= TYPING_TEXT.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 1500); // pause before deleting
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        i--;
        setDisplayText(TYPING_TEXT.slice(0, i));
        if (i <= 0) {
          isDeleting = false;
          timeout = setTimeout(tick, 500); // pause before retyping
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    };

    timeout = setTimeout(tick, 80);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-primary">ORD</span>
        <span className="text-muted-foreground">.log</span>
      </h1>
      <p className="text-muted-foreground mt-2 font-mono text-sm">
        {displayText}
        <span className="cursor-blink text-primary">_</span>
      </p>
    </div>
  );
};
export default Logo;
