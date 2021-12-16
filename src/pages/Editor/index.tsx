import useRequest from "@ahooksjs/use-request";
import { Spin } from "@yy/tofu-ui-react";
import React, { useEffect } from "react";
import { useParamsBy } from "../../hooks";
import { getDetail } from "../../service";
import { useAppDispatch } from "../../store";
import {
  setAppConfig,
  setAppName,
  setVersionInfo,
} from "../../store/editor/editorSlice";
import { FullPage } from "../../widgets/styled";
import Content from "./Content";
import { Header } from "./Header";
import Sider from "./Sider";
import { SiderRight } from "./SiderRight";
import Tools from "./Tools";

const Editor = () => {
  const versionId = useParamsBy("versionId");
  const { data, loading } = useRequest(() => getDetail({ versionId }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setVersionInfo(data));

      // if (data.version_config?.name) {
      //   dispatch(setAppName(data.version_config?.name));
      // }
      if (data.version_config?.config) {
        dispatch(setAppConfig(data.version_config?.config));
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
