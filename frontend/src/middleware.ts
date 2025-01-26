import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwtTokenExp } from './lib/auth'
import { refreshAccessToken } from './feature/auth/actions/refreshAccessToken'
import { isApiError } from './api/types'

export async function middleware(request: NextRequest) {
  // ログインとサインアップページへのアクセスは常に許可
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!accessToken && !refreshToken) {
    return handleLogout(request)
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
      return handleLogout(request)
    }

    // アクセストークンが無効な場合、リフレッシュトークンを使用して新しいアクセストークンを取得
    if (refreshToken) {
      try {
        const response = NextResponse.next()
        const newAccessTokenResponse = await refreshAccessToken(refreshToken)
        if (isApiError(newAccessTokenResponse)) {
          console.error('リフレッシュトークンの更新に失敗しました:', newAccessTokenResponse)
          return handleLogout(request)
        }

        response.cookies.set('accessToken', newAccessTokenResponse.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        })
        return response
      } catch (error) {
        console.error('リフレッシュトークンの更新に失敗しました:', error)
        return handleLogout(request)
      }
    }

    // 全てのトークンが無効な場合、ログインページにリダイレクト
    return handleLogout(request)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

const handleLogout = (request: NextRequest) => {
  const url = new URL('/login', request.url)
  const response = NextResponse.redirect(url, 303)
  response.cookies.delete('accessToken')
  response.cookies.delete('refreshToken')
  response.cookies.delete('userId')
  response.cookies.delete('username')
  if (request.headers.get('Accept') === 'text/x-component') {
    // Server Actionsでmiddleware.tsでリダイレクトを行うと、
    // リダイレクトは実行されず画面遷移が行われないため、
    // ミドルウェアでサーバーアクション応答を真似してレスポンスを返すことで、
    // 画面遷移を行うようにしている
    // この回避策は、Server Actionsではなく、ミドルウェアでリダイレクトを行う場合には不要
    // https://github.com/vercel/next.js/issues/65394
    return new NextResponse(null, {
      status: 303,
      headers: {
        'X-Action-Redirect': url.toString()
      }
    });
  }
  return response
}
