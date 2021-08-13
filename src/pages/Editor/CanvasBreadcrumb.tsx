import { Breadcrumbs, Icon } from "@yy/tofu-ui-react";
import React from "react";

const Seperator = () => (
  <Icon
    type="Arrow"
    style={{
      fontSize: 14,
      color: "#999",
      lineHeight: "18px",
    }}
  />
);

const CanvasBreadcrumb = () => {
  return (
    <div className="CanvasBreadcrumb">
      <Breadcrumbs separator={<Seperator />}>
        <Breadcrumbs.Item>根节点</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/">面包屑</Breadcrumbs.Item>
        <Breadcrumbs.Item>基本使用</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
};

export default CanvasBreadcrumb;
