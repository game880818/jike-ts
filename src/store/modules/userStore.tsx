import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { clearToken, getToken, setToken } from "@/utils/token";
import { getUserInfoAPI, loginAPI } from '@/apis/user';

interface UserInfo {
  id: string,
  photo: string,
  name: string,
  mobile: string,
  gender: number,
  intro: string,
  birthday: string,
}


// 1. 先定義 State 的結構 (型別定義)
interface UserState {
  token: string,
  userInfo: UserInfo
}

// 2. 初始值
const initialState: UserState = {
  token: getToken() || '',
  userInfo: {} as UserInfo
}

const userStore = createSlice({
  name: 'user',
  // データの状態
  initialState,
  // 同步修改方法
  reducers: {
    // payloadのかたを明確にする
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      setToken(state.token)
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    },
    clearUser(state) {
      state.token = '',
        state.userInfo = {} as UserInfo,
        clearToken()
    }
  }
})

export interface LoginFormValues {
  mobile: string;
  code: string;
}

// actionCreator を分割代入
const { setUserToken, setUserInfo, clearUser } = userStore.actions
// reducer 関数を取得
const userReducer = userStore.reducer

// 非同期メソッドのカプセル化
// ログイン処理を非同期で行う
const fetchLogin = (loginFrom: LoginFormValues) => {
  return async (dispatch: any) => {
    // 非同期リクエストを送信
    const res = await loginAPI(loginFrom)
    // token を更新 
    dispatch(setUserToken(res.data.token))
  }
}

// ログインユーザーの情報を非同期で取得
const fetchLoginUserInfo = () => {
  return async (dispatch: any) => {
    // 非同期リクエストを送信
    const res = await getUserInfoAPI()
    // userInfo を更新 
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchLoginUserInfo, clearUser }
export default userReducer