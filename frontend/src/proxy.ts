import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let locales = ['ar', 'en'];
export let defaultLocale = 'ar';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
};
