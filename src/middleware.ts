import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('authToken'); 
  let retryCount = 0;
  const maxRetries = 10;

  // Reintenta hasta 5 veces para verificar si el token está presente
  while (!token && retryCount < maxRetries) {
    await new Promise(res => setTimeout(res, 100)); // Espera 100ms
    token = request.cookies.get('authToken');
    retryCount++;
  }

  console.log("En el middleware para la ruta:", request.nextUrl.pathname);
  console.log("token: ", token);

  if (!token) {
    const loginUrl = new URL('/', request.url);
    console.log(`No token cookie after ${retryCount} retries, redirecting a ${loginUrl}`);
    return NextResponse.redirect(loginUrl);
  } else {
    console.log("Yes token cookie!", token);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {

//   console.log("En el middleware para la ruta:", request.nextUrl.pathname);
//   const res = NextResponse.json({ message: 'Setting a test cookie' });

//   res.cookies.set('testCookie', 'testValue', {
//     httpOnly: true,
//     secure: false,
//     maxAge: 60 * 60 * 24,
//   });

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/api/:path*'], 
// };
