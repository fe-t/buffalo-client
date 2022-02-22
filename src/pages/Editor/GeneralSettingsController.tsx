import { Space, Tag } from "antd";
import React from "react";
import { useAppSelector } from "../../store";
import { selectCursorComponent } from "../../store/editor/selectors";
import { BindData } from "../../widgets/BindData";

export const GeneralSettingsController = () => {
  const component = useAppSelector(selectCursorComponent);
  const boundConditionVar = component?.general?.conditionRender;

  return (
    <div className="GeneralSettingsController">
      <div className="GeneralSettingsRow">
        <Space>
          <span>条件渲染</span>
          {boundConditionVar && <Tag color="blue">{boundConditionVar}</Tag>}
        </Space>
        <BindData />
      </div>
      <br />
    </div>
  );
};
