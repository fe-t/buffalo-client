import { Button, Spacer, Tooltip } from "@yy/tofu-ui-react";
import { Button as AntButton, Space } from "antd";
import dayjs from "dayjs";
import qs from "qs";
import React, { useContext } from "react";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { RiRocketFill } from "react-icons/ri";
import { DirtyContext } from ".";
import { useParamsBy } from "../../hooks";
import { useAppSelector } from "../../store";
import { DATETIME_FORMAT } from "../../util";
import { FlexCenter } from "../../widgets/styled";

export const Header = () => {
  const versionId = useParamsBy("versionId");
  const versionInfo = useAppSelector((s) => s.editor.present.versionInfo);
  // const components = useAppSelector((s) => s.editor.present.components);
  // const dataSource = useAppSelector((s) => s.dataSource);

  // const save = async () => {
  //   try {
  //     setSubmitting(true);
  //     await saveDetail({
  //       versionId,
  //       components,
  //       dataSource,
  //     });
  //     toast("保存成功");
  //   } catch (e) {
  //     console.error(e);
  //     toast.error((e as any).message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const dirty = useContext(DirtyContext);

  return (
    <div className="Header">
      <FlexCenter>
        <a className="Logo" href="//webtest.yy.com/buffalo-admin/#/apps">
          {" "}
        </a>
        <Spacer x={1} inline />
        <div className="UpdateTime">
          {dirty ? (
            <FlexCenter>
              <span>未保存</span>
              <Spacer x={0.5} inline />
              <AiFillWarning style={{ color: "#ff4b4b" }} size="18" />
            </FlexCenter>
          ) : (
            <Tooltip
              text={
                <div>
                  <p>
                    最后更新于
                    {dayjs(Number(versionInfo.update_time)).format(
                      DATETIME_FORMAT
                    )}
                  </p>
                  <p>版本名称: {versionInfo.version_name}</p>
                </div>
              }
            >
              <FlexCenter>
                <span>{versionInfo.version_name}</span>
                <Spacer x={0.5} inline />
                <AiFillCheckCircle
                  style={{ color: "rgb(73 131 59)" }}
                  size="18"
                />
              </FlexCenter>
            </Tooltip>
          )}
        </div>
      </FlexCenter>
      <Space>
        <Tooltip text="保存 ⌘/ctrl + s">
          <AntButton icon={<FaSave />} type="text" style={{ color: "#999" }} />
        </Tooltip>
        <Button
          type="emphasis"
          onClick={() => {
            window.open(
              `https://webtest.yy.com/buffalo-apps/#/app/?${qs.stringify({
                versionId,
              })}`,
              "_blank"
            );
          }}
        >
          <RiRocketFill />
          <Spacer x={0.5} />
          <span>发布</span>
        </Button>
      </Space>
    </div>
  );
};
