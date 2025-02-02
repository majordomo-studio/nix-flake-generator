import * as React from 'react';
import { ThemeToggle, ThemeIcon } from '@/components/common/ThemeToggle';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

import { NotebookText, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';
import { mainLinks, projectLinks, iconStyles } from '@/components/CommandLinks';

import type { CollectionEntry } from 'astro:content';
type PostsType = CollectionEntry<'posts'>[];

type CommandMenuProps = {
  buttonStyles?: string;
  posts?: PostsType;
};

export function CommandMenu({ buttonStyles, posts }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const { toggleTheme } = ThemeToggle();

  const handleKeyDown = (event: KeyboardEvent) => {
    const { metaKey, ctrlKey, key, target } = event;

    const isEditable =
      (target instanceof HTMLElement && target.isContentEditable) ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    const linkShortcut = mainLinks.find((link) =>
      link.shortcut.toLowerCase().endsWith(key.toLowerCase())
    );

    if (
      ((metaKey || ctrlKey) && (key === 'k' || linkShortcut)) ||
      (key === '/' && !isEditable)
    ) {
      event.preventDefault();
      key === 'k' || key === '/'
        ? setOpen((open) => !open)
        : linkShortcut && navigate(linkShortcut.href);
    }
  };

  const navigate = (href: string) => {
    window.location.href = href;
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        aria-label="Open command menu"
        variant="outline"
        className={cn(
          'relative hidden h-9 justify-between rounded-[0.5rem] bg-background pr-1.5 text-sm font-normal text-muted-foreground shadow-none md:flex',
          buttonStyles
        )}
        style={{ width: 'clamp(120px, 20vw, 240px)' }}
        onClick={() => setOpen(true)}>
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {mainLinks.map((link) => (
              <CommandItem key={link.name} onSelect={() => navigate(link.href)}>
                {React.createElement(link.icon, { className: iconStyles })}
                {link.name}
                <CommandShortcut>{link.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projectLinks.map((project) => (
              <CommandItem
                key={project.name}
                onSelect={() => navigate(project.href)}>
                <ArrowUpRight className={iconStyles} />
                {project.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Blog Posts">
            {posts?.map((post) => (
              <CommandItem
                slot="blogPosts"
                key={post.data.title}
                className="text-balance"
                aria-label={`Link to blog post: ${post.data.title}`}
                onSelect={() => navigate(`/posts/${post.slug}/`)}>
                <NotebookText className={iconStyles} />
                {post.data.title}
                <CommandShortcut className="whitespace-nowrap pl-4 tracking-wide">
                  {formatDate(post.data.pubDate, {
                    month: 'short',
                  })}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={toggleTheme}>
              <ThemeIcon />
              <span className="ml-2">Toggle theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
