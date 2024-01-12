// login이 필요한 페이지에 접근시 login페이지로 redirect해줘야함
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const session = await fetch(`http://localhost:3000/api/auth/session`, {
    headers: headers(),
    // cache: "no-store"
  }).then(async (res) => await res.json());

  const loggedIn = Object.keys(session).length > 0 ? true : false;
  const pathname = request.nextUrl.pathname;

  if (!loggedIn) {
    return NextResponse.redirect(new URL("/admin/login", process.env.AUTH_URL));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/home", "/explore", "/messages", "/search"],
};
// export const config = {
//   matcher : ["/admin/:path*"]
// }
