import React, { FC, useEffect, useState } from "react";
import { Drawer, Space, Select, Input, Tooltip } from "antd";
import toast from "react-hot-toast";
import { Button } from "@yy/tofu-ui-react";
import { useAppSelector } from "../../store";
import { CopyOutlined } from '@ant-design/icons';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import { handleInputParam, handleOutputParam } from './util'

interface Props {
  visible: boolean;
  setVisible: (V: boolean) => void
}

const { Search } = Input;

export const ApiModal: FC<Props> = ({ visible, setVisible }) => {
  const [submitting, setSubmitting] = useState(false);
  const [tageeUrl, setTageeUrl] = useState('')
  const [uri, setUri] = useState('')
  const [domainList, setDomainList] = useState<any[]>([])
  const [inputData, setInputData] = useState('{}')
  const [outputData, setOutputData] = useState('{}')
  const close = () => setVisible(false);

  const getApiInfo = async (code: string) => {
    const { data } = await axios({
      method: "get",
      url: `http://tagee.yy.com/api/projectInterface/get`,
      params: {
        code: code
      },
    });
    if (data.code === 0) {
      const { uri, extendList, inputParam, outputParam } = data.data
      setDomainList(extendList)
      setUri(uri)
      const inputData = handleInputParam(inputParam)
      const outputData = handleOutputParam(outputParam)
      setInputData(inputData ? JSON.stringify(inputData, null, 2) : "")
      setOutputData(outputData ? JSON.stringify(outputData, null, 2) : "")
    }
  }

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
        // getApiInfo()
        <Space>
          <Search style={{ width: 500 }} placeholder="请输入tagee url" enterButton="获取接口信息" onSearch={(value: string) => {
            const url = value
            const list = url.split('/')
            const code = list[list.length - 1]
            getApiInfo(code)
          }} />
          {/* <Button onClick={() => { handleFormatted(config) }} >
            展示格式化
          </Button> */}
        </Space>
      }
    >
      {domainList.map((item, key) => {
        return (
          <Search addonBefore={item.name} key={'domian-url-' + key} style={{ width: 'calc(100%)', paddingBottom: '10px' }} defaultValue={'//' + item.value + uri} enterButton="复制URL" />
        )
      })}
      <h3>请求参数描述</h3>
      <Editor
        height="500px"
        defaultLanguage={'json'}
        value={inputData}
        onChange={(val) => {
          setInputData(val as string);
        }}
        theme="vs-dark"
      />
      <h3>返回参数描述</h3>
      <Editor
        height="500px"
        defaultLanguage={'json'}
        value={outputData}
        onChange={(val) => {
          setOutputData(val as string);
        }}
        theme="vs-dark"
      />
      <br /><br /><br /><br /><br />
    </Drawer>)
}
