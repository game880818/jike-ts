import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'

import { useDispatch } from 'react-redux'

// データ構造 / 型（かた）を導入
import { fetchLogin, type LoginFormValues } from '@/store/modules/userStore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const onFinish = async (formValue: LoginFormValues) => {
    await (dispatch as any)(fetchLogin(formValue))
    nevigate('/')
    message.success('ログイン成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* バリデーションのトリガー */}
        <Form
          validateTrigger={['onBlur']}
          onFinish={onFinish}
        >
          {/* バリデーションルールの追加 */}
          <Form.Item
            name='mobile'
            rules={[
              { required: true, message: '電話番号を入力してください' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '電話番号を正しく入力してください'
              }
            ]}
          >
            <Input size="large" placeholder="電話番号を入力してください" />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              { required: true, message: '検証番号を入力してください' },
            ]}
          >
            <Input size="large" placeholder="検証番号を入力してください" maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login