import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;


export class TokenService {
  constructor() { }

  async generateTokens(userId: string): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  async verifyToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

      if (typeof decoded.sub !== "string") {
        throw new Error("Invalid token payload: 'sub' is not a string");
      }

      return decoded.sub;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error(`Token expired: ${error.expiredAt}`);
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }
  }


  async refreshAccessToken(refreshToken: string): Promise<string> {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;

    if (typeof decoded.sub !== "string") {
      throw new Error("Invalid refresh token");
    }

    return this.generateAccessToken(decoded.sub);
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // 有効期限15分
    );
  }

  // リフレッシュトークン生成
  private generateRefreshToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // 有効期限7日
    );
  }

}
