export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'tauheed_portfolio_theme_v1';

/**
 * Resolves the active theme based on stored preference and system fallback.
 */
export function resolveTheme(
  storedPreference: string | null,
  systemPrefersDark: boolean
): ThemeMode {
  if (storedPreference === 'dark') return 'dark';
  if (storedPreference === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

/**
 * Returns the opposing theme for toggling.
 */
export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}
