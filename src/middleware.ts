import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  
  const allowedOrigins = [
    'http://localhost:3000',
    'http://www.localhost:3000',
    // Add more origins as needed
  ]
  
  // Option 1: Allow specific origins
  const isAllowedOrigin = allowedOrigins.includes(origin)
  
  return NextResponse.next({
    headers: {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export const config = {
  matcher: '/api/:path*',
}