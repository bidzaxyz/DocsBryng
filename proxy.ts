import { NextResponse, type NextRequest } from 'next/server';
import { shouldIndex } from './lib/site-policy.mjs';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  // Next may construct nextUrl from the internal listener behind a proxy.
  // Match the public request authority exactly; do not trust forwarded hosts.
  const hostname = (request.headers.get('host') ?? '').replace(/:\d+$/, '');
  if (!shouldIndex(hostname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|fonts/|images/).*)'],
};
