import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { request } from "@/utils"
import { getToken, setToken } from "@/utils/token";

// 1. 先定義 State 的結構 (型別定義)
interface UserState {
  token: string
}

// 2. 初始值
const initialState: UserState = {
  token: getToken() || ''
}

const userStore = createSlice({
  name: 'user',
  // データの状態
  initialState,
  // 同步修改方法
  reducers: {
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      setToken(state.token)
    }
  }
})

export interface LoginFormValues {
  mobile: string;
  code: string;
}

// actionCreator を分割代入
const { setUserToken } = userStore.actions
// reducer 関数を取得
const userReducer = userStore.reducer
// 非同期メソッドのカプセル化
const fetchLogin = (loginFrom: LoginFormValues) => {
  return async (dispatch: any) => {
    // 非同期リクエストを送信
    const res = await request.post('/authorizations', loginFrom)
    // token を更新 
    dispatch(setUserToken(res.data.token))
  }
}

export { fetchLogin }
export default userReducer