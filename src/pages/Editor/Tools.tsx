import { Button, Icon, Spacer, Tabs, Tooltip } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdBrush, MdCode, MdRedo, MdTv, MdUndo } from "react-icons/md";
import { ActionCreators } from "redux-undo";
import { useAppDispatch, useAppSelector } from "../../store";

const Tools = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const past = useAppSelector((state) => state.editor.past);
  const future = useAppSelector((state) => state.editor.future);

  return (
    <section className="Tools">
      <div>
        <Tooltip text="撤销">
          <Button
            disabled={past.length <= 0}
            onClick={() => {
              toast.success("撤销");
              dispatch(ActionCreators.undo());
            }}
          >
            <MdUndo />
          </Button>
        </Tooltip>
        <Spacer x={0.5} inline />
        <Tooltip text="重做">
          <Button
            disabled={future.length <= 0}
            onClick={() => {
              toast.success("重做");
              dispatch(ActionCreators.redo());
            }}
          >
            <MdRedo />
          </Button>
        </Tooltip>
        <Spacer x={0.5} inline />
        <Button>
          <span>保存</span>
        </Button>
      </div>
      <Tabs className="ToolsTabs" value={selectedTab} onChange={setSelectedTab}>
        <Tabs.Tab
          label={
            <Tooltip text="画布">
              <MdBrush />
            </Tooltip>
          }
        />
        <Tabs.Tab
          label={
            <Tooltip text="预览">
              <MdTv />
            </Tooltip>
          }
        />
        <Tabs.Tab
          label={
            <Tooltip text="代码">
              <MdCode />
            </Tooltip>
          }
        />
      </Tabs>
    </section>
  );
};

export default Tools;
