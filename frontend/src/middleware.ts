import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwtTokenExp } from './lib/auth'
import { refreshAccessToken } from './feature/auth/actions/refreshAccessToken'
import { isApiError } from './api/api'

export async function middleware(request: NextRequest) {
  // ログインとサインアップページへのアクセスは常に許可
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (accessToken) {
    try {
      const exp = decodeJwtTokenExp(accessToken)
      if (exp && exp > Date.now() / 1000) {
        return NextResponse.next()
      }
    }
    catch (error) {
      console.error('アクセストークンの検証に失敗しました:', error)
    }

    // アクセストークンが無効な場合、リフレッシュトークンを使用して新しいアクセストークンを取得
    if (refreshToken) {
      try {
        const response = NextResponse.next()
        const newAccessTokenResponse = await refreshAccessToken(refreshToken)
        if (isApiError(newAccessTokenResponse)) {
          console.error('リフレッシュトークンの更新に失敗しました:', newAccessTokenResponse)
          return NextResponse.redirect(new URL('/login', request.url))
        }

        response.cookies.set('accessToken', newAccessTokenResponse.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        return response
      } catch (error) {
        console.error('リフレッシュトークンの更新に失敗しました:', error)
      }
    }

    // 全てのトークンが無効な場合、ログインページにリダイレクト
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
