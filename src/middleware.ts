import { auth as middleware } from '@/auth';
import { NextResponse } from 'next/server';
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  vendorRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from 'route';

export default middleware(async (req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) => {
    if (route.endsWith('/*')) {
      const base = route.replace('/*', '');
      return nextUrl.pathname.startsWith(base);
    }
    return nextUrl.pathname === route;
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isVendorRoute = nextUrl.pathname.startsWith(vendorRoutes);

  if (isApiRoute) {
    return NextResponse.next();
  }

  /**
   * 로그인했을 때 다시 가면 안되는 페이지
   */
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  /**
   * 로그인하지 않았을 때 가면 되는 페이지
   */
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  /**
   * 벤더만 갈 수 있는 페이지
   */
  if (isLoggedIn && isVendorRoute && auth.role !== 'vendor') {
    return NextResponse.redirect(new URL('/', nextUrl));
  }
  /**
   * 다른 유저 채팅방 출입 금지
   */
  if (isLoggedIn && nextUrl.pathname.startsWith('/chat')) {
    const consumerId = nextUrl.searchParams.get('consumerId');
    const vendorId = nextUrl.searchParams.get('vendorId');

    if (
      String(auth?.consumerSeq) === consumerId ||
      String(auth?.vendorSeq) === vendorId
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
