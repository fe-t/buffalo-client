import { Button, Spacer, Tabs, Tooltip } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdBrush, MdCode, MdRedo, MdTv, MdUndo } from "react-icons/md";
import { ActionCreators } from "redux-undo";
import { useAppDispatch, useAppSelector } from "../../store";
import { VarConfigModal } from "../../widgets/VarConfigModal/VarConfigModal";
import { AiOutlineFunction } from "react-icons/ai";
import { ConfigModal } from "../../widgets/ConfigModal/ConfigModal";
import { ApiModal } from "../../widgets/ApiDrawer/ApiDrawer";

const Tools = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const past = useAppSelector((state) => state.editor.past);
  const future = useAppSelector((state) => state.editor.future);
  const [v, setV] = useState(false);
  const [configV, setConfigV] = useState(false);
  const [apiV, setApiV] = useState(false);

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
        <VarConfigModal visible={v} setVisible={setV} />
        <Button
          type="weak"
          onClick={() => {
            setV(true);
          }}
        >
          <AiOutlineFunction style={{ fontSize: "18px", color: "#ff4f4f" }} />{" "}
          变量
        </Button>
        <Spacer x={0.5} inline />
        <Button
          type="weak"
          onClick={() => {
            setApiV(true);
          }}
        >
          接口获取（test）
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
            <Tooltip onClick={() => setConfigV(true)} text="代码">
              <MdCode />
            </Tooltip>
          }
        />
      </Tabs>
      <ApiModal visible={apiV} setVisible={setApiV}></ApiModal>
      <ConfigModal visible={configV} setVisible={setConfigV}></ConfigModal>
    </section>
  );
};

export default Tools;
