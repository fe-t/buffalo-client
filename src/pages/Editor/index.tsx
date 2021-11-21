import useRequest from "@ahooksjs/use-request";
import { Spin } from "@yy/tofu-ui-react";
import React, { useEffect } from "react";
import { useParamsBy } from "../../hooks";
import { getDetail } from "../../service";
import { FullPage } from "../../widgets/styled";
import Content from "./Content";
import Sider from "./Sider";
import { SiderRight } from "./SiderRight";
import Tools from "./Tools";

const Editor = () => {
  // const { data } = useRequest(() => axios.get("/api/biz/allList"));
  const id = useParamsBy("id");
  const { data, loading } = useRequest(() => getDetail({ id: id as string }));

  useEffect(() => {}, []);

  return loading ? (
    <Spin size="m">
      <FullPage />
    </Spin>
  ) : (
    <main className="Editor">
      <Tools />
      <div className="EditorContent">
        <Sider />
        <Content />
        <SiderRight />
      </div>
    </main>
  );
};

export default Editor;
