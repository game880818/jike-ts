import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./modules/userStore"

// storeを統一して導出
export const store = configureStore({
  reducer: {
    user: userReducer
  }
})

// 這裡定義 AppDispatch，它會自動包含 Thunk 的型別
export type AppDispatch = typeof store.dispatch