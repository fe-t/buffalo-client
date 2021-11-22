import useRequest from "@ahooksjs/use-request";
import { Spin } from "@yy/tofu-ui-react";
import React, { useEffect } from "react";
import { useParamsBy } from "../../hooks";
import { getDetail } from "../../service";
import { useAppDispatch } from "../../store";
import { setAppConfig, setAppName } from "../../store/editor/editorSlice";
import { FullPage } from "../../widgets/styled";
import Content from "./Content";
import { Header } from "./Header";
import Sider from "./Sider";
import { SiderRight } from "./SiderRight";
import Tools from "./Tools";

const Editor = () => {
  // const { data } = useRequest(() => axios.get("/api/biz/allList"));
  const id = useParamsBy("id");
  const { data, loading } = useRequest(() => getDetail({ id: id as string }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      if (data.config?.name) {
        dispatch(setAppName(data.config.name)); // 暂时
      }
      if (data.config?.appConfig) {
        dispatch(setAppConfig(data.config.name)); // 暂时
      }
    }
  }, [data, dispatch]);

  return loading ? (
    <Spin size="m">
      <FullPage />
    </Spin>
  ) : (
    <main className="Editor">
      <Header />
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
