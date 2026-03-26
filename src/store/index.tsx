import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./modules/userStore"

// storeを統一して導出
export default configureStore({
  reducer: {
    user: userReducer
  }
})