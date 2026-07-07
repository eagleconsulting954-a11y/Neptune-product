import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  const authed = request.cookies.get("neptune_session")?.value === "demo-admin";
  const activePlan = request.cookies.get("neptune_paid")?.value === "active";

  if (isAdmin && !authed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdmin && !activePlan) {
    const checkoutUrl = new URL("/checkout", request.url);
    return NextResponse.redirect(checkoutUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
