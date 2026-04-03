# 📰 Geek Park 文章管理後台系統

> 以 React + TypeScript 建構的單頁應用程式（SPA），實作完整的文章發布與管理功能，並串接 RESTful API 進行後端資料互動。

---

## 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | React 18 |
| 語言 | TypeScript |
| 狀態管理 | Redux Toolkit |
| 路由 | React Router v6 |
| UI 元件庫 | Ant Design |
| HTTP 請求 | Axios |
| 圖表 | ECharts |
| 富文本編輯器 | React Quill |
| 樣式 | SCSS |

---

## ✨ 功能特色

### 🔐 使用者驗證
- 以手機號碼 + 驗證碼登入，搭配正則表達式做表單驗證
- Token 儲存於 localStorage，實作 Axios 請求攔截器自動帶入 `Authorization` Header
- 回應攔截器統一處理 401 未授權錯誤，自動清除 Token 並跳轉至登入頁

### 🛡️ 路由守衛（AuthRoute）
- 自訂 `AuthRoute` 元件包覆受保護路由，未登入時自動導向登入頁
- 使用 React Router v6 的巢狀路由（Nested Routes）架構

### ⚡ 路由懶加載（Lazy Loading）
- 以 `React.lazy` + `Suspense` 對 Home、Article、Publish 三個頁面進行程式碼分割（Code Splitting），優化初始載入效能

### 📋 文章列表管理（Article）
- 串接 API 取得文章列表，支援依「公開狀態」、「文章分類」、「發布日期區間」複合篩選
- 使用 Ant Design Table 呈現列表，內建分頁功能，切換頁碼時自動觸發 API 重新請求
- 刪除文章前以 Popconfirm 元件做二次確認，刪除後自動刷新列表

### ✍️ 文章新增 / 編輯（Publish）
- 同一頁面依 URL query string（`?id=xxx`）判斷為「新增」或「編輯」模式，實現路由複用
- 整合 React Quill 富文本編輯器，支援文章內容排版
- 封面圖片支援單圖 / 三圖 / 無圖三種模式，切換模式時自動同步已上傳的圖片快取（使用 `useRef` 暫存），避免切換時圖片遺失
- 表單送出前驗證圖片數量是否符合所選模式

### 📊 首頁資料視覺化（Home）
- 整合 ECharts 繪製長條圖，將圖表封裝成可複用的 `BarChart` 元件，透過 Props 傳入標題、X 軸資料、數值資料，提高元件複用性

### 🧩 狀態管理（Redux Toolkit）
- 使用 `createSlice` 管理使用者的 token 與個人資訊（userInfo）
- 封裝非同步 Thunk Action（`fetchLogin`、`fetchLoginUserInfo`）處理登入與取得使用者資訊
- 自訂 `useAppDispatch` Hook，解決 TypeScript 中 dispatch 無法推導非同步型別的問題

### 🪝 自訂 Hook
- `useGetChannel`：封裝取得文章分類列表的副作用邏輯，在 Article 與 Publish 頁面共用，避免重複程式碼

---

## 📁 專案結構

```
src/
├── apis/           # API 請求函式（article / publish / user）
├── assets/         # 靜態資源（圖片）
├── components/     # 可複用元件（AuthRoute 路由守衛）
├── hooks/          # 自訂 Hook（useAppDispatch / useGetChannel）
├── pages/          # 頁面元件
│   ├── Article/    # 文章列表頁
│   ├── Home/       # 首頁（含 BarChart 元件）
│   ├── Layout/     # 全域排版（側邊欄、Header）
│   ├── Login/      # 登入頁
│   └── Publish/    # 文章新增 / 編輯頁
├── router/         # 路由設定（含懶加載）
├── store/          # Redux 狀態管理
│   └── modules/
│       └── userStore.tsx
└── utils/          # 工具函式（Axios 封裝 / Token 管理）
```

---

## 🚀 如何啟動

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

> API Base URL：`https://geek.itheima.net/v1_0`

---

## 🌱 學習收穫

這是我在學習 React 生態系過程中獨立完成的實作專案，過程中深入理解了以下概念：

- React Hooks（useState / useEffect / useRef / 自訂 Hook）的應用場景與設計
- Redux Toolkit 的 Slice 模式與非同步 Thunk 的使用
- Axios 攔截器統一處理 Token 注入與錯誤回應
- TypeScript 泛型、介面定義在實際專案中的型別安全實踐
- React Router v6 巢狀路由與程式碼分割（Code Splitting）的效能優化
