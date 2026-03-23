import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

// データ構造 / 型（かた）を定義する
interface LoginFormValues {
  mobile: string;
  code: string;
}

const Login = () => {
  const onFinish = (formValue: LoginFormValues) => {
    console.log(formValue)
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
                pattern: /^0[789]0\d{8}$/,
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
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login