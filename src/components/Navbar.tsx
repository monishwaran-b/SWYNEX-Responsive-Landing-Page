import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';

interface NavbarProps {
  onOpenRepo: () => void;
  onOpenTrial: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ onOpenRepo, onOpenTrial, darkMode, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Demo', href: '#demo' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Benchmarks', href: '#benchmarks' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            Strata
          </a>

          {/* Zone 2: 4–5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-neutral-950 dark:hover:border-neutral-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* GitHub Repo Trigger */}
            <button
              type="button"
              onClick={onOpenRepo}
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              title="View GitHub Repository"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle color theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenTrial}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-xl transition-all shadow-xs whitespace-nowrap shrink-0 active:scale-95"
            >
              Start Free Trial
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRepo();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center justify-center gap-2 text-neutral-800 dark:text-neutral-200"
            >
              <Github className="w-4 h-4" />
              <span>Inspect GitHub Repository</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 rounded-xl transition-colors text-center"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
