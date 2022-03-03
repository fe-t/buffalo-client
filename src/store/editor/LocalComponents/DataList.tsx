import { FC, useMemo } from "react";
import { Search, Table, withTable } from "@yy/data-table";
import { ColumnInfo } from "../../../widgets/TableColumnsEditor/TableColumnsEditor";
import { useAppSelector } from "../..";
import axios from "axios";
import qs from "qs";
import dayjs from "dayjs";
import numeral from "numeral";
import { FlexExpand } from "../../../widgets/styled";

const formatterMap = new Map([
  [
    "dateTimeYYYYMMDDHHmmSS",
    (v: any) => dayjs(v).format("YYYY-MM-DD HH:mm:ss"),
  ],
  ["dateYYYYMMDD", (v: any) => dayjs(v).format("YYYY-MM-DD")],
  ["money", (v: any) => `¥${numeral(v).format("0,0.00")}`],
  ["0,0", (v: any) => `${numeral(v).format("0,0")}`],
]);

const renderCell = (column: ColumnInfo) => {
  const formatter = formatterMap.get(column.formatter);
  if (formatter) {
    return ({ value }: any) => formatter(value);
  }
  return undefined;
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

  // 改造 columns，支持 render 方法
  const _columns = useMemo(() => {
    return (columns || []).map((c: ColumnInfo) => {
      const result = {
        accessor: c.accessor,
        Header: c.Header,
        Cell: renderCell(c),
      };
      if (typeof result.Cell === "undefined") {
        delete result.Cell;
      }
      return result;
    });
  }, [columns]);

  return (
    <div {...props}>
      <FlexExpand>
        <Search
          schema={_schema as any}
          api={searchApi as any}
          hidden={hidden}
        />
        {/* <Button>导出</Button> */}
      </FlexExpand>
      <Table columns={_columns} />
    </div>
  );
};
export const DataList = withTable(DataListInner);
