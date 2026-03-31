import { Link } from 'react-router-dom'

import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Tag, Space, Table } from 'antd'
import locale from 'antd/es/date-picker/locale/ja_JP'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'


import useGetChannel from '@/hooks/useGetChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

// 文章の資料の型を定義する
interface ArticleData {
  id: string
  comment_count: number
  cover: {
    images: string[]
  }
  like_count: number
  pubdate: string
  read_count: number
  status: number
  title: string
}
// 文章のリストの型を定義する
interface ListData {
  list: ArticleData[]
  count: number
}

export interface PageData {
  page: number,
  per_page: number,
  begin_pubdate: string | null | undefined,
  end_pubdate: string | null | undefined,
  status: string | null | undefined,
  channel_id: number | null | undefined
}

const Article = () => {
  // const data: TableData[] = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: [],
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]
  // 准备列数据
  const columns = [
    {
      title: 'カバー',
      dataIndex: 'cover',
      width: 120,
      render: (cover: any) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状態',
      dataIndex: 'status',
      render: (data: ArticleData) => <Tag color="green">审核通过</Tag>
    },
    {
      title: '公開日時',
      dataIndex: 'pubdate'
    },
    {
      title: '読み数',
      dataIndex: 'read_count'
    },
    {
      title: 'コメント数',
      dataIndex: 'comment_count'
    },
    {
      title: 'いいね数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data: ArticleData) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  const { channel } = useGetChannel()
  // 文章リスト
  const [articleList, setArticleList] = useState<ListData>({
    list: [],
    count: 0
  })
  // ページの条件
  const [params, setParams] = useState<PageData>({
    page: 1,
    per_page: 10,
    begin_pubdate: '',
    end_pubdate: '',
    status: '',
    channel_id: 0
  })
  useEffect(() => {
    async function fetchArticleList() {
      const res = await getArticleListAPI(params)
      console.log(res)
      setArticleList({
        list: res.data.results,
        count: res.data.total_count
      })
    }
    fetchArticleList()
  }, [])
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>ホーム</Link> },
            { title: '文章リスト' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }}>
          <Form.Item label="状態" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>未公開</Radio>
              <Radio value={2}>公開</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="種類" name="channel_id">
            <Select
              placeholder="種類を選択"
              style={{ width: 200 }}
            >
              {channel.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="公開日時" name="date">
            {/* 传入locale属性 控制日文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              検索
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格数据 */}
      <Card title={`条件で一致する記事数： ${articleList.count} 件`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList.list}
        />
      </Card>
    </div>
  )
}

export default Article