import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const disableTransitions = () => {
  const css = document.createElement('style');
  css.textContent = `
    * {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      -ms-transition: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(css);
  requestAnimationFrame(() => {
    document.head.removeChild(css);
  });
};

export const ThemeToggle = () => {
  const toggleTheme = () => {
    const currentTheme =
      localStorage.getItem('themeToggle') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    disableTransitions();

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('themeToggle', newTheme);
  };

  return { toggleTheme };
};

export const ThemeIcon = () => {
  return (
    <>
      <Sun className='size-5 scale-100 dark:scale-0' />
      <Moon className='absolute size-5 scale-0 dark:scale-100' />
    </>
  );
};

export function ModeToggle() {
  const { toggleTheme } = ThemeToggle();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="focus-visible:bg-accent focus-visible:ring-transparent">
      <ThemeIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
