import { useState, useEffect, useCallback } from 'react';
import { resolveTheme, getNextTheme, THEME_STORAGE_KEY, type ThemeMode } from '../domain/theme.ts';

function applyThemeToDom(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = theme === 'dark';

  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return resolveTheme(stored, systemPrefersDark);
  });

  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = getNextTheme(prev);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // LocalStorage fallback
      }
      applyThemeToDom(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // LocalStorage fallback
    }
    setThemeState(newTheme);
    applyThemeToDom(newTheme);
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme, setTheme };
}
