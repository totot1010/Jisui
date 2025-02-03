import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory'
import { TokenService } from '../../application/auth/service/token.service';
import { UserQueryService } from '../../application/user/service/userQuery.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';

export const requiredAuth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const response = new Response("Unauthorized", { status: 401 });
    throw new HTTPException(401, { res: response });
  }

  try {
    // 'Bearer 'の部分を除去してトークンを認証
    const userId = await TokenService.verifyToken(authHeader.slice(7));

    // ユーザーIDを取得
    await new UserQueryService(new UserRepository()).getById({ userId: userId });

    // 認証されたユーザーIDをリクエストに追加
    c.set('userId', userId);

    // 処理を続行
    await next();
  } catch (error) {
    console.error(error);
    const response = new Response("Unauthorized", { status: 401 });
    throw new HTTPException(401, { res: response });
  }
});
