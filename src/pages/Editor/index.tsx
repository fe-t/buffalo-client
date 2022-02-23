import useRequest from "@ahooksjs/use-request";
import { Spin } from "@yy/tofu-ui-react";
import { isEqual } from "lodash";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useParamsBy } from "../../hooks";
import { getDetail } from "../../service";
import { useAppDispatch, useAppSelector } from "../../store";
import { setAppData, setPageData } from "../../store/editor/dataSourceSlice";
import {
  selectComponents,
  setSavedComponents,
  setVersionInfo,
} from "../../store/editor/editorSlice";
import { DataSaveGuard } from "../../widgets/DataSaveGuard";
import { FullPage } from "../../widgets/styled";
import Content from "./Content";
import { Header } from "./Header";
import { KeyboardEventWrapper } from "./KeyboardEventWrapper";
import Sider from "./Sider";
import { SiderRight } from "./SiderRight";
import Tools from "./Tools";

export const DirtyContext = createContext(false);

const Editor = () => {
  const versionId = useParamsBy("versionId");
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, loading, run } = useRequest(() => getDetail({ versionId }), {
    manual: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    run();
  }, [refreshKey, run]);

  // 远程数据，用于对比本地是否已经做了更改
  const [remoteVersionData, setRemoteVersionData] = useState({
    components: [],
    dataSource: {},
  });

  useEffect(() => {
    if (data) {
      dispatch(setVersionInfo(data));

      const versionConfig =
        typeof data.version_config === "string"
          ? JSON.parse(data.version_config)
          : data.version_config;

      if (versionConfig.components) {
        dispatch(setSavedComponents(versionConfig.components));

        setRemoteVersionData((prev) => ({
          ...prev,
          components: versionConfig.components,
        }));
      }
      if (versionConfig.dataSource) {
        dispatch(setAppData(versionConfig.dataSource.$app));
        dispatch(setPageData(versionConfig.dataSource.$page));

        setRemoteVersionData((prev) => ({
          ...prev,
          dataSource: versionConfig.dataSource,
        }));
      }
    }
  }, [data, dispatch]);

  const components = useAppSelector(selectComponents);
  const dataSource = useAppSelector((s) => s.dataSource);

  const dirty = useMemo(() => {
    if (!data) return false;
    const localVersionData = { components, dataSource };
    return !isEqual(localVersionData, remoteVersionData);
  }, [components, data, dataSource, remoteVersionData]);

  return !data && loading ? ( // 首次加载显示 loading
    <Spin size="m">
      <FullPage />
    </Spin>
  ) : (
    <DirtyContext.Provider value={dirty}>
      <KeyboardEventWrapper onSaveSuccess={() => setRefreshKey((p) => p + 1)}>
        <DataSaveGuard />

        <main className="Editor">
          <Header />
          <Tools />
          <div className="EditorContent">
            <Sider />
            <Content />
            <SiderRight />
          </div>
        </main>
      </KeyboardEventWrapper>
    </DirtyContext.Provider>
  );
};

export default Editor;
