## バックエンド環境構築手順

### 1. パッケージのインストール
env.exampleをコピーして.envファイルを作成してください
```bash
cp .env.example .env
```

乱数を生成し、secretに値を入れてください、例ではopenSSLを使用しています
```bash
openssl rand -base64 32
```

```
npm install
npm run dev
```

### 2. データベースの作成
```
docker-compose up -d
```

## マイグレーション
prismaを使用しています

### マイグレーションファイルの作成と実行
開発段階なのでまだ意識することはありませんが、このコマンドは本番環境では非推奨です
https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production?
```
npm run prisma:migrate:dev -name=xxx
```

### Prisma Studioの実行
Prisma Studioとは、データベースの中身を確認するためのGUIツールです。
結構便利なので使ってみてください
```
npm run prisma:studio
```
