import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware'
import {NextRequest} from 'next/server'
import { notFound } from 'next/navigation';

const locales = ['fr', 'en'];
const publicPages = ['/login', '/signup', '/forgot-password', '/enter-token', '/new-password', '/about', '/terms', '/contact', '/city/(.*)'];
const protectedPages = ['/user/(.*)']

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'fr'
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/login'
    }
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  const protectedPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${protectedPages.join('|')})?/?$`,
    'i'
  );
  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } if (isProtectedPage) {
    return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};