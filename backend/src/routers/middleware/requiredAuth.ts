import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory'
import { TokenService } from '../../application/auth/service/token.service';

export const requiredAuth = createMiddleware(async (c, next) => {
  console.log("requiredAuth");
  const authHeader = c.req.header('Authorization');
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("ログインしてください");
    const response = new Response("Unauthorized", { status: 401 });
    throw new HTTPException(401, { res: response });
  }

  // 'Bearer 'の部分を除去してトークンを認証
  try {
    const verifyToken = await TokenService.verifyToken(authHeader.slice(7));
    // 認証されたユーザーIDをリクエストにx追加
    c.set('userId', verifyToken);
    await next();

  } catch (error) {
    console.error(error);
    const response = new Response("Unauthorized", { status: 401 });
    throw new HTTPException(401, { res: response });
  }
});
