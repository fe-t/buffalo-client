import { Space } from "antd";
import React from "react";
import { BindData } from "../../widgets/BindData";

export const GeneralSettingsController = () => {
  return (
    <div className="GeneralSettingsController">
      <div className="GeneralSettingsRow">
        <Space>
          <span>条件渲染</span>
        </Space>
        <BindData />
      </div>
      <br />
    </div>
  );
};
