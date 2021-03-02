import { Button, Icon, Spacer, Tooltip } from "@yy/tofu-ui-react";
import React from "react";
import { MdRedo, MdUndo } from "react-icons/md";

const Tools = () => {
  return (
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
  );
};

export default Tools;
