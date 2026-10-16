import { useState, useEffect, useCallback } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { path: '/', params: {}, searchParams: new URLSearchParams() };
  }

  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  // Match /projects/:slug
  const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
  if (projectMatch) {
    return {
      path: '/projects/:slug',
      params: { slug: projectMatch[1] },
      searchParams,
    };
  }

  if (pathname === '/privacy' || pathname === '/privacy/') {
    return { path: '/privacy', params: {}, searchParams };
  }

  if (pathname === '/admin' || pathname === '/admin/') {
    return { path: '/admin', params: {}, searchParams };
  }

  if (pathname === '/' || pathname === '') {
    return { path: '/', params: {}, searchParams };
  }

  return { path: '404', params: {}, searchParams };
}

export function navigate(url: string, replace: boolean = false) {
  if (typeof window === 'undefined') return;

  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }

  window.dispatchEvent(new Event('popstate'));
  // Scroll to top on page navigation if no hash
  if (!url.includes('#')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseCurrentRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setQueryParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(window.location.search);
    if (value === null || value === '' || value === 'all') {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const searchStr = current.toString();
    const newUrl = `${window.location.pathname}${searchStr ? `?${searchStr}` : ''}${window.location.hash}`;
    window.history.pushState({}, '', newUrl);
    setRoute(parseCurrentRoute());
  }, []);

  return { route, navigate, setQueryParam };
}
