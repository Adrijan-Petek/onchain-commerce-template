'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.ockTheme = theme === 'dark' ? 'base-dark' : 'base-light';
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const initial =
      stored === 'dark' || stored === 'light' ? stored : 'light';
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle rounded-md border border-gray-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-sm hover:bg-white"
      aria-label="Toggle light and dark theme"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
