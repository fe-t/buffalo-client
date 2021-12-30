/**
 * 注册组件，让画布和属性编辑器能识别到
 */
import React, { FC } from "react";
import {
  applyPropertyControls,
  ControlType,
} from "../../pages/Editor/property-controls";
import { CanvasElementType } from "../../types";
import { Datagrid, Input, Link, Select } from "@yy/tofu-ui-react";
import SchemaForm from "../../widgets/SchemaForm";
import { Search, Table, withTable } from "@yy/data-table";
import axios from "axios";
import qs from "qs";
import { useAppSelector } from "..";

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

const DataListInner: FC<any> = ({
  pathName,
  schema,
  hidden,
  columns,
  ...props
}) => {
  const _schema = JSON.parse(schema);
  const mode = useAppSelector((s) => s.dataSource.mode);

  const searchApi = async (args: any) => {
    if (mode === "editor") {
      return {
        rows: [{}],
        count: 0,
      };
    }
    const res = await axios.get(
      `${pathName}${qs.stringify({ ...args }, { addQueryPrefix: true })}`
    );
    debugger;
    return {};
  };

  return (
    <div {...props}>
      <Search schema={_schema as any} api={searchApi as any} hidden={hidden} />
      <Table columns={columns || []} />
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

export const componentMap = new Map<string, CanvasElementType>([
  ["1", Datagrid],
  ["2", Input],
  ["3", Select],
  ["4", Page],
  ["5", SchemaForm],
  ["6", DataList],
]);
