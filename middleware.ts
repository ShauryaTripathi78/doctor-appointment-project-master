import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/doctors", "/about", "/contact", "/admin/login", "/doctor/login"]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname)

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, check authentication
  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (pathname.startsWith("/doctor")) {
      return NextResponse.redirect(new URL("/doctor/login", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify token for protected routes
  const decoded = verifyToken(token)
  if (!decoded) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (pathname.startsWith("/doctor")) {
      return NextResponse.redirect(new URL("/doctor/login", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Role-based access control for protected routes
  if (pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (pathname.startsWith("/doctor") && decoded.role !== "doctor") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
}
