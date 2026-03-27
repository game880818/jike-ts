import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd';
import './index.scss'
// router 関連のインポート
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useEffect } from 'react';
import { useAppDispatch } from '@/components/useAppDispatch';
import { fetchLoginUserInfo } from '@/store/modules/userStore';
import { useSelector } from 'react-redux';


const { Header, Sider } = Layout

const items = [
  {
    label: 'ホームページ',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '文章作成',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  // 現在のパスを取得
  const currentPath = location.pathname
  // 現在のログインユーザーの名前を取得
  const name = useSelector((state: any) => state.user.userInfo.name)

  useEffect(() => {
    // ログインユーザーの情報を非同期で取得
    dispatch(fetchLoginUserInfo())
  }, [dispatch])

  // MenuPropsを使ってonClickのかたを自動的に推導する
  const onMenuClick: MenuProps['onClick'] = (e) => {
    // クリックしたメニューのパスを取得
    navigate(e.key);
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="ログアウトしますか？" okText="ログアウト" cancelText="キャンセル">
              <LogoutOutlined /> ログアウト
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[currentPath]}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout