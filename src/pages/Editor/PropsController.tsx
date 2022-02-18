import {
  Empty,
  Link,
  Popconfirm,
  Popover,
  Spacer,
  Tooltip,
} from "@yy/tofu-ui-react";
import { Tabs } from "antd";
import { capitalize } from "lodash";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { MdContentCopy, MdDelete, MdInfoOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteCursorComponent,
  selectCursorComponent,
} from "../../store/editor/editorSlice";
import { componentMap } from "../../store/editor/registerComponents";
import { RenderPropsItem } from "../../types";
import { default as Collapse } from "../../widgets/Collapse";
import { ComponentStyleEditor } from "../../widgets/ComponentStyleEditor";
import { FlexCenter, FlexStart, TabTitle } from "../../widgets/styled";
import { ActionController } from "./ActionController";
import { GeneralSettingsController } from "./GeneralSettingsController";
import PropEditorSwitcher from "./PropEditorSwitcher";

const { TabPane } = Tabs;

const CopyComponentBtn = () => {
  const handleClick = useCallback(() => {
    toast.success("复制成功");
  }, []);

  return (
    <Link block className="InfoTypeLink" onClick={handleClick}>
      <MdContentCopy size="18" />
    </Link>
  );
};

const DeleteComponentBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <Popconfirm
      onConfirm={() => dispatch(deleteCursorComponent())}
      title="确认删除该组件吗?"
    >
      <Link block className="InfoTypeLink">
        <MdDelete size="18" />
      </Link>
    </Popconfirm>
  );
};

const PropsController = () => {
  const component = useAppSelector(selectCursorComponent);

  const componentType = componentMap.get(component?.materialId);
  const propList = useMemo(() => {
    return Object.entries(componentType?.propertyControls || {}).reduce(
      (acc: RenderPropsItem[], [propName, propInfo]) => {
        const item = { ...propInfo, name: propName };
        // 如果 Canvas组件有值，读取 canvas 组件的值
        if (component?.props[propName]) {
          item.value = component?.props[propName];
        }
        return [...acc, item];
      },
      []
    );
  }, [component?.props, componentType?.propertyControls]);

  return (
    <section className="PropsController" onClick={(e) => e.stopPropagation()}>
      {component ? (
        <div className="PropsPane">
          <div className="PropsPaneHeader">
            <p>
              <span>{component.name}</span>
              <span>{component.zhName}</span>
            </p>
            <FlexCenter>
              <CopyComponentBtn />
              <DeleteComponentBtn />
            </FlexCenter>
          </div>
          <div className="PropsPaneHeaderSub">
            <b>组件ID</b>
            <span className="">#{component.id}</span>
          </div>

          <div className="PropsPaneContent">
            <Tabs
              defaultActiveKey="1"
              onChange={() => {}}
              type="card"
              animated={{ tabPane: true, inkBar: true }}
            >
              <TabPane tab={<TabTitle>属性</TabTitle>} key="1">
                <Collapse.Group>
                  <Collapse title="基础组件属性" defaultOpen>
                    <div className="PropsPaneFields">
                      {propList.map((p) => {
                        return (
                          <div
                            className="PropsPaneField"
                            key={`${p.name}-${component?.id}`}
                          >
                            <div className="PropsPaneFieldTitle">
                              <FlexStart>
                                <span>{p.label}</span>
                                <Spacer inline x={0.3} />
                                <span>{capitalize(p.name)}</span>
                                {p.desc && (
                                  <>
                                    <Spacer inline x={0.3} />
                                    <Tooltip text={p.desc}>
                                      <MdInfoOutline
                                        size="16"
                                        style={{ marginTop: 4 }}
                                      />
                                    </Tooltip>
                                  </>
                                )}
                                {p.popHint && (
                                  <>
                                    <Spacer inline x={0.3} />
                                    <Popover
                                      placement="top"
                                      reference={
                                        <MdInfoOutline
                                          size="16"
                                          style={{ marginTop: 4 }}
                                        />
                                      }
                                    >
                                      {p.popHint}
                                    </Popover>
                                  </>
                                )}
                              </FlexStart>
                            </div>
                            <Spacer y={0.5} />
                            <PropEditorSwitcher propItem={p} />
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                  <Collapse title="通用配置" defaultOpen={false}>
                    <GeneralSettingsController />
                  </Collapse>
                  <Collapse title="行为" defaultOpen>
                    <ActionController />
                  </Collapse>
                </Collapse.Group>
              </TabPane>
              <TabPane tab={<TabTitle>样式</TabTitle>} key="2">
                <ComponentStyleEditor component={component} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      ) : (
        <>
          <Spacer y={2} />
          <Empty text="请在画布选择一个组件来编辑属性" />
        </>
      )}
    </section>
  );
};

export default PropsController;
