import React, { FC, useEffect, useState } from "react";
import { Drawer, Space } from "antd";
import toast from "react-hot-toast";
import { Button } from "@yy/tofu-ui-react";
import { useAppSelector } from "../../store";
import { useParamsBy } from "../../hooks";
import { saveDetail } from "../../service";

import Editor from "@monaco-editor/react";

interface Props {
  visible: boolean;
  setVisible: (V: boolean) => void
}

export const ConfigModal: FC<Props> = ({ visible, setVisible }) => {
  const components = useAppSelector((s) => s.editor.present.components);
  const formatted = components ? JSON.stringify(components, null, 2) : "";
  const [config, setConfig] = useState<string>(formatted);
  const [submitting, setSubmitting] = useState(false);
  const versionId = useParamsBy("versionId");
  const close = () => setVisible(false);
  const save = async () => {
    try {
      setSubmitting(true);
      const components = JSON.parse(config)
      await saveDetail({ versionId, components });
      toast("保存成功，页面刷新中...");
      window.location.reload()
    } catch (e) {
      console.error(e);
      toast.error((e as any).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormatted = (contentStr: string) => {
    const content = JSON.parse(contentStr)
    const formatted = content ? JSON.stringify(content, null, 2) : "";
    setConfig(formatted)
  }

  useEffect(() => {
    const formatted = components ? JSON.stringify(components, null, 2) : "";
    setConfig(formatted)
  }, [components])

  return (
    <Drawer
      title="版本配置管理"
      visible={visible}
      destroyOnClose
      onClose={close}
      width={1000}
      footer={null}
      extra={
        <Space>
          <Button type="emphasis" onClick={save} loading={submitting}>
            保存并刷新页面
          </Button>
          <Button onClick={() => { handleFormatted(config) }} >
            格式化
          </Button>
        </Space>
      }
    >
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
