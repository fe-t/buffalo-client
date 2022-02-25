/**
 * 注册组件，让画布和属性编辑器能识别到
 */
import { Button, Datagrid, Input, Link, Select } from "@yy/tofu-ui-react";
import { Divider, Space } from "antd";
import { range } from "lodash";
import React, { FC } from "react";
import { BiLoader } from "react-icons/bi";
import { MdAdsClick } from "react-icons/md";
import {
  ActionType,
  applyActionControls,
} from "../../pages/Editor/action-controls";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { CanvasElementType } from "../../types";
import SchemaForm from "../../widgets/SchemaForm";
import { ConfigSteps } from "./LocalComponents/ConfigSteps";
import { DataList } from "./LocalComponents/DataList";
import { DisplayDataSource } from "./LocalComponents/DisplayDataSource";
import { Heading } from "./LocalComponents/Heading";
import { RoutesBreadcrumb } from "./LocalComponents/RoutesBreadcrumb";

/** 自定义的物料 */
const Page: FC<{
  children: string;
  name: string;
  type: string;
  backgroundColor: string;
  height: number;
}> = ({ children, name, type, backgroundColor, height = 100 }) => {
  return (
    <div
      className="Page"
      style={{
        padding: "20px",
        border: "1px solid #999",
        backgroundColor,
        height,
      }}
    >
      <p>page: {name}</p>
      <p>type: {type}</p>
      <div>children: {children}</div>
    </div>
  );
};

applyPropertyControls(Heading, {
  content: {
    type: ControlType.String,
    label: "标题内容",
    defaultValue: "标题内容",
  },
  level: {
    type: ControlType.Enum,
    label: "标题等级",
    options: range(1, 6).map((x) => ({ label: `${x}级`, value: x })),
    defaultValue: 2,
  },
  textAlign: {
    type: ControlType.Enum,
    label: "对齐方式",
    options: ["left", "center", "right"].map((x) => ({ label: x, value: x })),
    defaultValue: "left",
  },
});

applyPropertyControls(RoutesBreadcrumb, {
  routesJson: {
    type: ControlType.CodeField,
    label: "路由配置",
    desc: (
      <Space>
        格式参考
        <a href="https://ant.design/components/breadcrumb-cn/#%E5%92%8C-browserHistory-%E9%85%8D%E5%90%88">
          antd 文档
        </a>
      </Space>
    ),
  },
});

applyPropertyControls(DisplayDataSource, {
  display: {
    type: ControlType.String,
    label: "变量路径",
  },
});

applyPropertyControls(Button, {
  children: {
    type: ControlType.String,
    label: "按钮文字",
    defaultValue: "按钮",
  },
  type: {
    type: ControlType.Enum,
    label: "类型",
    options: ["normal", "emphasis", "weak", "confirm", "reject", "cancel"].map(
      (x) => ({ label: x, value: x })
    ),
  },
  size: {
    type: ControlType.Enum,
    label: "尺寸",
    options: ["xl", "l", "m", "s", "xs"].map((x) => ({ label: x, value: x })),
  },
});

applyActionControls(Button, {
  onClick: {
    type: ActionType.onClick,
    label: "点击时",
    icon: <MdAdsClick />,
  },
  onMount: {
    type: ActionType.onMount,
    label: "加载完成后",
    icon: <BiLoader />,
  },
});

/** 注册物料编辑属性 */
applyPropertyControls(Page, {
  children: {
    type: ControlType.ComponentInstance,
    required: true, // TODO: impl required
    placeholder: "选择子组件",
    defaultValue: undefined,
    label: "子组件",
    desc: "Lorem ipsum sei weigs",
  },
  name: {
    type: ControlType.String,
    required: true,
    defaultValue: "Home Page",
    label: "字段名称",
  },
  type: {
    type: ControlType.Enum,
    placeholder: "选择类型",
    label: "页面类型",
    defaultValue: "large",
    options: [
      { label: "大的", value: "large" },
      { label: "一般", value: "normal" },
      { label: "小的", value: "small" },
    ],
  },
  backgroundColor: {
    type: ControlType.Color,
    label: "背景颜色",
  },
  height: {
    type: ControlType.Number,
    label: "高度",
    defaultValue: 100,
    extend: {
      unit: "px",
    },
  },
});

applyPropertyControls(Input, {
  placeholder: {
    type: ControlType.String,
    defaultValue: "请输入",
    label: "占位字符",
  },
  disabled: {
    type: ControlType.Boolean,
    defaultValue: false,
    label: "是否禁用",
  },
});

applyPropertyControls(SchemaForm, {
  schema: {
    type: ControlType.TextField,
    defaultValue: "",
    label: "定义模型",
    desc: (
      <span>
        可以通过
        <a href="https://x-render.gitee.io/tools/generator/playground">
          在线schema编辑器
        </a>
        配置
      </span>
    ),
  },
});

applyPropertyControls(DataList, {
  pathName: {
    type: ControlType.String,
    defaultValue: "",
    label: "接口路径",
    placeholder: "初始化/翻页时候请求的接口地址",
    desc: <span>初始化/翻页时候请求的接口地址</span>,
  },
  schema: {
    type: ControlType.CodeField,
    defaultValue:
      '{"type":"object","properties":{"query":{"title":"输入框","type":"string","description":"输入ID或者名称搜索可梦宝"}}}',
    label: "查询表单",
    placeholder: "Schema",
    popHint: (
      <span>
        协议生成的查询表单
        <Link
          href="http://webtest.yy.com/data-list-doc/2-demos.html"
          block
          target="_blank"
        >
          查看更多
        </Link>
      </span>
    ),
  },
  hidden: {
    type: ControlType.Boolean,
    defaultValue: false,
    label: "是否隐藏查询表单",
  },
  columns: {
    type: ControlType.TableColumns,
    defaultValue: [],
    label: "表格字段配置",
  },
});

applyPropertyControls(ConfigSteps, {
  routes: {
    type: ControlType.CodeField,
    label: "步骤配置",
    defaultValue: JSON.stringify([
      {
        title: "第一步",
      },
      {
        title: "第二步",
      },
      {
        title: "第三步",
      },
    ]),
  },
  current: {
    type: ControlType.Number,
    label: "当前步骤",
  },
});

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
  ["5", SchemaForm],
  ["6", DataList],
  ["7", Button],
  ["8", DisplayDataSource],
  ["9", RoutesBreadcrumb],
  ["10", Heading],
  ["11", Divider],
  ["12", ConfigSteps],
]);
