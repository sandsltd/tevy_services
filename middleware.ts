import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

// Create a TextEncoder
const textEncoder = new TextEncoder()

export async function middleware(request: NextRequest) {
  const { pathname, protocol, host } = request.nextUrl

  // Force HTTPS redirection in production
  if (protocol === 'http:' && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(
      `https://${host}${pathname}${request.nextUrl.search}`,
      { status: 301 }
    )
  }

  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value

  // Check if the request is for the dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Create a secret key from the JWT_SECRET
      const secret = new Uint8Array(
        textEncoder.encode(process.env.JWT_SECRET || 'your-secret-key')
      )

      // Verify the token
      await jose.jwtVerify(token, secret)
      
      // Token is valid, allow access to dashboard
      return NextResponse.next()
    } catch (error) {
      // Invalid token, clear it and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  // If user is already logged in and tries to access login page
  if (pathname === '/login' && token) {
    try {
      const secret = new Uint8Array(
        textEncoder.encode(process.env.JWT_SECRET || 'your-secret-key')
      )
      await jose.jwtVerify(token, secret)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      // Invalid token, clear it
      const response = NextResponse.next()
      response.cookies.delete('auth_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 