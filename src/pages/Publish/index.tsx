import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
  type RadioChangeEvent
} from 'antd'
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import { useEffect, useState } from 'react';

// react-quill
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // 這是 Snow 主題（白底）

// API
import { getChannelAPI, publishAPI } from '@/apis/publish';

const { Option } = Select

// 種類の型を定義する
interface ChannelItem {
  id: number,
  name: string
}

// フォームの値の型を定義する
export interface FormValue {
  title: string,
  channel_id: number,
  content: string
}

const Publish = () => {
  const [channel, setChannel] = useState<ChannelItem[]>([])
  const [imageList, setImageList] = useState<UploadFile[]>([])
  const [imageType, setImageType] = useState<number>(1)

  useEffect(() => {
    async function getChannel() {
      const res = await getChannelAPI()
      setChannel(res.data.channels)
    }
    getChannel()
  }, [])

  // 文章を公開する関数
  async function onFormFinish(formValue: FormValue) {
    const { title, channel_id, content } = formValue
    const params = {
      title,
      channel_id,
      content,
      type: 1,
      cover: {
        type: 1,
        image: []
      }
    }
    // 文章を公開する
    await publishAPI(params)
    message.success('文章が成功に公開されました')
  }

  // 画像をアップロードする関数
  function onUploadChange(info: UploadChangeParam<UploadFile>) {
    console.log(info);
    setImageList(info.fileList)
  }

  // 種類を変更する関数
  function onTypeChange(e: RadioChangeEvent) {
    setImageType(Number(e.target.value))
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFormFinish}
        >
          {/* タイトル */}
          <Form.Item
            label="タイトル"
            name="title"
            rules={[{ required: true, message: 'タイトルを入力してください' }]}
          >
            <Input placeholder="タイトルを入力してください" style={{ width: 400 }} />
          </Form.Item>
          {/* 種類選択 */}
          <Form.Item
            label="種類"
            name="channel_id"
            rules={[{ required: true, message: '種類を選択してください' }]}
          >
            {/* 種類選択 */}
            <Select placeholder="種類を選択してください" style={{ width: 400 }}>
              {channel.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '文章を入力してください' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="文章を入力してください"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish