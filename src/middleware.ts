import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get("user");

  // If a valid user session exists, skip the homepage
  if (sessionCookie && request.nextUrl.pathname === "/") {
    try {
      const sessionData = JSON.parse(sessionCookie.value);

      // Validate session data and redirect
      if (sessionData.username && sessionData.job) {
        return NextResponse.redirect(new URL("/characters", request.url));
      }
    } catch (error) {
      console.error("Invalid session data", error);
      return NextResponse.next();
    }
  }

  // Check for valid session data on directory route
  if (request.nextUrl.pathname.startsWith("/characters")) {
    // If no session cookie at all, redirect to home
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const sessionData = JSON.parse(sessionCookie.value);

      // Invalid session data, redirect to home
      if (!sessionData.username || !sessionData.job) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid session data", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
