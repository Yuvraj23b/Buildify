import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/site', '/api/uploadthing', '/'], // Ensure the main page '/' is public
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    // Rewrite domains
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    const hostname = req.headers.get('host') || '';

    // Check if there is a custom subdomain
    const customSubDomain = hostname
      .split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      );
    }
    
    //second part of the how app navigation works means if sub domain exist -> no then

    if(url.pathname === "/sign-in" || url.pathname === "/sign-up"){
      return NextResponse.redirect(new URL(`/agency/sign-in`,req.url))
    }

    //if user wants to access the website or we can say main page 

    if(url.pathname === '/' || 
      (url.pathname === 'site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)){
        return NextResponse.rewrite(new URL('/site', req.url))
      }

    if(url.pathname.startsWith('/agency') || url.pathname.startsWith('/subaccount')){
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`,req.url))
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
