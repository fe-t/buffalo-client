/**
 * 注册组件，让画布和属性编辑器能识别到
 */
import React, { FC } from "react";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { CanvasElementType } from "../../types";
import { Datagrid, Input, Select } from "@yy/tofu-ui-react";
import SchemaForm from "../../widgets/SchemaForm";
import { Search, Table, withTable } from "@yy/data-table";

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

const DataListInner: FC<any> = (props) => {
  const schema = JSON.parse(props.schema);

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "名称", accessor: "name" },
    { Header: "基础经验值", accessor: "base_experience" },
    { Header: "形象", accessor: "sprites" },
  ];

  const searchApi = async (args: any) => {
    return {
      rows: [{}],
      count: 0,
    };
  };

  return (
    <div>
      <Search
        schema={schema as any}
        api={searchApi as any}
        hidden={props.hidden}
      />
      <Table columns={columns} />
    </div>
  );
};
const DataList = withTable(DataListInner);

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
    type: ControlType.TextField,
    defaultValue:
      '{"type":"object","properties":{"query":{"title":"输入框","type":"string","description":"输入ID或者名称搜索可梦宝"}}}',
    label: "Schema",
    placeholder: "查询表单Schema",
  },
  hidden: {
    type: ControlType.Boolean,
    defaultValue: false,
    label: "是否隐藏查询表单",
  },
});

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
  ["5", SchemaForm],
  ["6", DataList],
]);
