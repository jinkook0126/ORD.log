import { Github, Mail } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-8 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <Link to="/" className="flex items-center font-mono text-sm font-bold tracking-tight">
            <span className="text-primary">ORD</span>
            <span className="text-muted-foreground">.log</span>
          </Link>
          <p className="text-muted-foreground text-xs">© {year} ddodak. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:jinqook0126@naver.com"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>jinqook0126@naver.com</span>
          </a>
          <a
            href="https://github.com/jinkook0126/ORD.log"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
