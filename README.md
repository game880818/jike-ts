# 📰 Geek Park 記事管理バックオフィスシステム

> React + TypeScript で構築したシングルページアプリケーション（SPA）です。記事の投稿・管理機能を実装し、RESTful API を通じてバックエンドとデータ連携しています。

---

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|------|------|
| フレームワーク | React 18 |
| 言語 | TypeScript |
| 状態管理 | Redux Toolkit |
| ルーティング | React Router v6 |
| UI コンポーネント | Ant Design |
| HTTP リクエスト | Axios |
| グラフ | ECharts |
| リッチテキストエディタ | React Quill |
| スタイル | SCSS |

---

## ✨ 機能一覧

### 🔐 ユーザー認証
- 電話番号 + 認証コードでログイン、正規表現によるバリデーションを実装
- Token を localStorage に保存し、Axios リクエストインターセプターで `Authorization` ヘッダーを自動付与
- レスポンスインターセプターで 401 エラーを一元処理し、Token を削除してログインページへ自動リダイレクト

### 🛡️ ルートガード（AuthRoute）
- カスタム `AuthRoute` コンポーネントで保護ルートをラップし、ログインしていない時はログインページへ自動遷移
- React Router v6 のネストルート（Nested Routes）構成を採用

### ⚡ ルートの遅延読み込み（Lazy Loading）
- `React.lazy` + `Suspense` を使い、Home・Article・Publish の 3 ページでコード分割（Code Splitting）を実施し、初期ロードのパフォーマンスを最適化

### 📋 記事一覧管理（Article）
- API から記事一覧を取得し、「公開状態」「記事カテゴリ」「公開日時の範囲」による複合絞り込みをサポート
- Ant Design の Table コンポーネントで一覧を表示し、ページ切り替え時に自動で API を再リクエスト
- 記事削除前に Popconfirm で二重確認を実施し、削除後に一覧を自動更新

### ✍️ 記事作成・編集（Publish）
- URL クエリストリング（`?id=xxx`）の有無で「新規作成」と「編集」を判定し、同一ページで両モードを実現（ルートの再利用）
- React Quill のリッチテキストエディタを統合し、記事本文の書式設定に対応
- カバー画像は「1枚」「3枚」「なし」の 3 種類をサポート。モード切替時は `useRef` でアップロード済み画像をキャッシュし、画像が消えないよう設計
- フォーム送信前に画像枚数が選択モードと一致しているか検証

### 📊 ホーム画面のデータ可視化（Home）
- ECharts を組み込んで棒グラフを描画。グラフを `BarChart` コンポーネントとして再利用可能に設計し、タイトル・X 軸データ・数値データを Props で渡す形で再利用性を高めた

### 🧩 状態管理（Redux Toolkit）
- `createSlice` でユーザーの Token・プロフィール情報（userInfo）を管理
- 非同期 Thunk Action（`fetchLogin`・`fetchLoginUserInfo`）でログイン処理とユーザー情報取得を実装
- カスタム `useAppDispatch` フックを作成し、TypeScript で非同期 dispatch の型推論が正しく機能するよう対応

### 🪝 カスタムフック
- `useGetChannel`：記事カテゴリ一覧を取得する副作用ロジックをカプセル化し、Article・Publish の両ページで共有することで重複コードを排除

---

## 📁 プロジェクト構成

```
src/
├── apis/           # API リクエスト関数（article / publish / user）
├── assets/         # 静的ファイル（画像）
├── components/     # 再利用コンポーネント（AuthRoute ルートガード）
├── hooks/          # カスタムフック（useAppDispatch / useGetChannel）
├── pages/          # ページコンポーネント
│   ├── Article/    # 記事一覧ページ
│   ├── Home/       # ホームページ（BarChart コンポーネント含む）
│   ├── Layout/     # グローバルレイアウト（サイドバー・ヘッダー）
│   ├── Login/      # ログインページ
│   └── Publish/    # 記事作成・編集ページ
├── router/         # ルーティング設定（遅延読み込み含む）
├── store/          # Redux 状態管理
│   └── modules/
│       └── userStore.tsx
└── utils/          # ユーティリティ（Axios 設定 / Token 管理）
```

---

## 🚀 起動方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

> API Base URL：`https://geek.itheima.net/v1_0`

---

## 🌱 学んだこと

React エコシステムを学ぶ中で、独力で実装した練習プロジェクトです。以下の概念を実践を通じて深く理解しました。

- React Hooks（useState / useEffect / useRef / カスタムフック）の適切な使い分け
- Redux Toolkit の Slice パターンと非同期 Thunk の活用
- Axios インターセプターによる Token 付与とエラーハンドリングの一元化
- TypeScript のジェネリクス・インターフェース定義による型安全な開発
- React Router v6 のネストルートとコード分割によるパフォーマンス最適化
