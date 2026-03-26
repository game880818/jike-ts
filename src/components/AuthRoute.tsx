import { getToken } from "@/utils/token"
import { Navigate } from "react-router-dom"

import { type ReactNode } from 'react'

// 認証ルートガード
// トークンがない場合はログイン画面へリダイレクトする
const AuthRoute = ({ children }: { children: ReactNode }) => {
  // tokenがあれば
  const token = getToken()
  if (token) {
    // 普通に執行
    return <>{children}</>
  } else {
    // ログインページに戻る
    return <Navigate to={'/login'} replace />
  }
}

export default AuthRoute