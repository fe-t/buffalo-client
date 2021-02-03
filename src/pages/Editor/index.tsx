import { Button, Card, Icon, Spacer, Tooltip } from "@yy/tofu-ui-react";
import React from "react";
import { MdRedo, MdUndo } from "react-icons/md";

const Editor = () => (
  <main className="Editor">
    <section className="Tools">
      <Tooltip text="撤销">
        <Button>
          <MdUndo />
        </Button>
      </Tooltip>
      <Spacer x={0.5} inline />
      <Tooltip text="重做">
        <Button>
          <MdRedo />
        </Button>
      </Tooltip>
      <Spacer x={0.5} inline />
      <Button>
        <Icon type="View" size="small" />
        <span>预览</span>
      </Button>
      <Spacer x={0.5} inline />
      <Button>
        <span>保存</span>
      </Button>
    </section>
    <div className="EditorContent">
      <section className="ComponentList">
        <Card size="small" draggable>
          Datagrid - 数据网格
        </Card>
        <Spacer y={0.5} />
        <Card size="small">Input - 输入框</Card>
        <Spacer y={0.5} />
        <Card size="small">Select - 选择器</Card>
      </section>
      <section className="Canvas"></section>
      <section className="PropsController"></section>
    </div>
  </main>
);

export default Editor;
