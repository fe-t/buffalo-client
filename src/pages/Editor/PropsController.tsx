import {
  Divider,
  Input,
  Link,
  Popover,
  Spacer,
  Switch,
  Tabs,
} from "@yy/tofu-ui-react";
import { capitalize } from "lodash";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteCursorComponent,
  updateComponentProp,
} from "../../store/editor/editorSlice";
import { PropItem } from "../../types";
import { FlexEnd } from "../../widgets/styled";

const PropsPane = () => {
  const dispatch = useAppDispatch();
  const component = useAppSelector((state) => {
    const components = state.editor.components;
    const cursorId = state.editor.cursorComponentId;
    return components.filter((c) => c.id === cursorId)[0];
  });

  const propList = ((component && component.props) || []) as PropItem[];

  const handlePropChange = useCallback(
    (index: number, propValue: any) => {
      if (component) {
        dispatch(
          updateComponentProp({
            componentId: component.id,
            propIndex: index,
            propValue,
          })
        );
      }
    },
    [component, dispatch]
  );

  return (
    <div className="PropsPane">
      {propList.map((p, index) => {
        return (
          <div className="PropsPaneField" key={p.name}>
            <div className="PropsPaneFieldTitle">
              <span>{p.zhName}</span>
              <Spacer inline x={0.3} />
              <span>{capitalize(p.name)}</span>
            </div>
            <Spacer y={0.5} />
            <div>
              {p.type === "boolean" && (
                <Switch
                  checked={p.value}
                  onChange={(e) => handlePropChange(index, e.target.checked)}
                />
              )}
              {p.type === "string" && (
                <Input
                  defaultValue={p.value}
                  onBlur={(e) => {
                    handlePropChange(index, e.target.value);
                  }}
                />
              )}
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

const DeleteComponentBtn = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      placement="left"
      trigger="click"
      popupElClassName="PopoverPopup"
      alwaysVisible={visible}
      reference={
        <Link block className="DeleteBtnLink" onClick={() => setVisible(true)}>
          <MdDelete size="18" />
        </Link>
      }
    >
      <Spacer y={0.5} />
      <p>确认删除该组件吗？</p>
      <Spacer y={1} />
      <FlexEnd className="PopoverCtrl">
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            setVisible(false);
          }}
        >
          取消
        </Link>
        <Spacer inline x={1} />
        <Link
          block
          onClick={() => {
            dispatch(deleteCursorComponent());
            setVisible(false);
          }}
        >
          确认
        </Link>
      </FlexEnd>
    </Popover>
  );
};

const PropsController = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const cursorComponentId = useAppSelector(
    (state) => state.editor.cursorComponentId
  );

  return (
    <section className="PropsController">
      {cursorComponentId && (
        <div>
          <Tabs
            value={selectedTab}
            onChange={setSelectTab}
            extra={<DeleteComponentBtn />}
          >
            <Tabs.Tab label="属性" />
            <Tabs.Tab label="样式" />
            <Tabs.Tab label="事件" />
          </Tabs>
          <div className="tf-tab-panes">
            <Tabs.TabPane value={selectedTab} index={0}>
              <PropsPane />
            </Tabs.TabPane>
            <Tabs.TabPane value={selectedTab} index={1}>
              <p>样式</p>
            </Tabs.TabPane>
            <Tabs.TabPane value={selectedTab} index={2}>
              <p>事件</p>
            </Tabs.TabPane>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropsController;
