import React, { FC, useEffect, useState } from "react";
import { Drawer, Space, Select, Input, Tooltip } from "antd";
import toast from "react-hot-toast";
import { Button } from "@yy/tofu-ui-react";
import { useAppSelector } from "../../store";
import { CopyOutlined } from '@ant-design/icons';
import Editor from "@monaco-editor/react";
import axios from 'axios';

interface Props {
  visible: boolean;
  setVisible: (V: boolean) => void
}

// const { Option } = Select
const { Search } = Input;

export const ApiModal: FC<Props> = ({ visible, setVisible }) => {
  const components = useAppSelector((s) => s.editor.present.components);
  const formatted = components ? JSON.stringify(components, null, 2) : "";
  const [config, setConfig] = useState<string>(formatted);
  const [submitting, setSubmitting] = useState(false);
  const close = () => setVisible(false);

  const handleFormatted = (contentStr: string) => {
    const content = JSON.parse(contentStr)
    const formatted = content ? JSON.stringify(content, null, 2) : "";
    setConfig(formatted)
  }

  const getApiInfo = async () => {
    const { data } = await axios({
      method: "get",
      url: `http://tagee.yy.com/api/projectInterface/get`,
      data: {
        code: '61404cde495a1c9b8b9473773ac35a17'
      },
    });
  }

  useEffect(() => {
    const formatted = components ? JSON.stringify(components, null, 2) : "";
    setConfig(formatted)
    getApiInfo()
  }, [components])

  return (
    <Drawer
      title="接口信息"
      placement={'left'}
      visible={visible}
      maskClosable={false}
      mask={false}
      onClose={close}
      width={800}
      footer={null}
      extra={
        <Space>
          <Search style={{ width: 500 }} placeholder="请输入tagee url" enterButton="获取接口信息" />
          <Button onClick={() => { handleFormatted(config) }} >
            展示格式化
          </Button>
        </Space>
      }
    >
      {/* <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 80px)' }}
          defaultValue=""
        />
        <Tooltip title="复制url">
          <Button children={<CopyOutlined />} />
        </Tooltip>
      </Input.Group> */}
      <Search addonBefore="正式接口" style={{ width: 'calc(100%)', paddingBottom: '10px' }} enterButton="复制URL" />
      <Search addonBefore="测试接口" style={{ width: 'calc(100%)', paddingBottom: '10px' }} enterButton="复制URL" />
      <Editor
        height="600px"
        defaultLanguage={'json'}
        value={config}
        onChange={(val) => {
          setConfig(val as string);
        }}
        theme="vs-dark"
      />
    </Drawer>)
}
