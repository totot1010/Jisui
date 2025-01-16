# Jisui Frontend

## 概要
Jisuiのフロントエンドアプリケーションです。Next.js、TypeScript、Tailwind CSSを使用して構築されています。

## 技術スタック
- React: ^19.0.0
- Next.js: ^15.1.3
- TypeScript: ^5.0.0
- Tailwind CSS: ^3.4.16
- ESLint: ^9.0.0
- Vitest: ^2.1.8

また、shadcn/uiを使用しています。
- https://ui.shadcn.com/

## 必要要件
- Node.js: ^20.11.0
- npm: ^10.0.0

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`env.example`をコピーして`.env`ファイルを作成してください

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
アプリケーションは http://localhost:3000 で起動します。

## 利用可能なスクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルドの作成
- `npm run start`: プロダクションサーバーの起動
- `npm run lint`: ESLintによるコード検証
- `npm run test`: テストの実行

## プロジェクト構造

```
src/
├── api/            # APIクライアントの設定と型定義
├── app/            # Next.jsのページコンポーネント
├── components/     # 共通コンポーネント
├── constants/      # 定数
├── feature/        # 機能別モジュール
├── hooks/          # カスタムフック
└── lib/           # ユーティリティ関数とヘルパー
```

### 主要ディレクトリの説明

- `api/`: APIクライアントの設定と型定義を管理
- `app/`: Next.jsのファイルベースルーティングに基づくページコンポーネント
  - `(authenticated)/`: 認証が必要なページ
  - `(unauthenticated)/`: 認証が不要なページ
- `components/`: 再利用可能なUIコンポーネント
  - `layout/`: レイアウト関連のコンポーネント
  - `shadcn/`: shadcn/uiのコンポーネント（変更禁止）
  - `ui/`: 基本的なUIコンポーネント
- `feature/`: 機能別のモジュール（認証、投稿、ユーザー管理など）
- `hooks/`: アプリケーション全体で使用するカスタムフック
- `lib/`: ライブラリのラッパーなど

## コーディング規約

### 命名規則
- ファイル名: PascalCase（例: UserProfile.tsx）
- コンポーネント: PascalCase
- 型定義: PascalCase（例: UserTypes.ts）
- ディレクトリ名: kebab-case（例: user-profile/）
- 変数・関数名: camelCase
- 定数: SNAKE_CASE

### コンポーネント開発ガイドライン
1. コンポーネントは機能単位で分割
2. Props型は明示的に定義
3. 再利用可能なロジックはカスタムフックとして実装
4. UIコンポーネントはshadcn/uiを優先的に使用

## テスト
- コンポーネントテストは各コンポーネントと同じディレクトリに配置
- `npm run test`でテストを実行

## 注意事項
- shadcn/uiコンポーネントの直接的な変更は禁止
