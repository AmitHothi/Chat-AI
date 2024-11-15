import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { routing } from "@/locales/routing";
import createMiddleware from "next-intl/middleware";
 
const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
});

export function middleware(request: NextRequest) {

    // Let intlMiddleware handle locale-based redirection first
    const intlResponse = intlMiddleware(request);
    if (intlResponse) return intlResponse;

  if (request.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.rewrite(new URL('/chat', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/documents')) {
    return NextResponse.rewrite(new URL('/documents', request.url))
  }
}