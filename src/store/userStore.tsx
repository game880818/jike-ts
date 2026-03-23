import { createSlice } from "@reduxjs/toolkit"
import { request } from "@/utils"


const userStore = createSlice({
  name: 'user',
  // データの状態
  initialState: {
    token: ''
  },
  // 同步修改方法
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload
    }
  }
})

export interface LoginFormValues {
  mobile: string;
  code: string;
}

// 解构出actionCreater
const { setUserToken } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer
// 异步方法封装
const fetchLogin = (loginFrom: LoginFormValues) => {
  return async (dispatch: any) => {
    const res = await request.post('/authorizations', loginFrom)
    dispatch(setUserToken(res.data.token))
  }
}

export { fetchLogin }
export default userReducer