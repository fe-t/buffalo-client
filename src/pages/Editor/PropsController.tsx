import { Divider, Input, Spacer, Switch, Tabs } from "@yy/tofu-ui-react";
import { capitalize } from "lodash";
import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateComponentProp } from "../../store/editor/editorSlice";
import { PropItem } from "../../types";

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
      dispatch(
        updateComponentProp({
          componentId: component.id,
          propIndex: index,
          propValue,
        })
      );
    },
    [component.id, dispatch]
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

const PropsController = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const cursorComponentId = useAppSelector(
    (state) => state.editor.cursorComponentId
  );

  return (
    <section className="PropsController">
      {cursorComponentId && (
        <div>
          <Tabs value={selectedTab} onChange={setSelectTab}>
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
