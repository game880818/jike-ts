import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // 這是 Snow 主題（白底）

const { Option } = Select

const Publish = () => {
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
        >
          <Form.Item
            label="タイトル"
            name="title"
            rules={[{ required: true, message: 'タイトルを入力してください' }]}
          >
            <Input placeholder="タイトルを入力してください" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="種類"
            name="channel_id"
            rules={[{ required: true, message: '種類を選択してください' }]}
          >
            <Select placeholder="種類を選択してください" style={{ width: 400 }}>
              <Option value={0}>おすすめ</Option>
            </Select>
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