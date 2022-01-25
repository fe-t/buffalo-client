import { Button, Icon, Spacer, Tooltip } from "@yy/tofu-ui-react";
import dayjs from "dayjs";
import qs from "qs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParamsBy } from "../../hooks";
import { saveDetail } from "../../service";
import { useAppSelector } from "../../store";
import { DATETIME_FORMAT } from "../../util";
import { FlexCenter } from "../../widgets/styled";

export const Header = () => {
  const versionId = useParamsBy("versionId");
  const versionInfo = useAppSelector((s) => s.editor.present.versionInfo);
  const components = useAppSelector((s) => s.editor.present.components);
  const dataSource = useAppSelector((s) => s.dataSource);
  const [submitting, setSubmitting] = useState(false);

  const save = async () => {
    try {
      setSubmitting(true);
      await saveDetail({
        versionId,
        components,
        dataSource,
      });
      toast("保存成功");
    } catch (e) {
      console.error(e);
      toast.error((e as any).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Header">
      <FlexCenter>
        <div className="Logo" />
        <Spacer x={1} inline />
        <div className="UpdateTime">
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
              <Icon type="RoundCheck" size="small" />
            </FlexCenter>
          </Tooltip>
        </div>
      </FlexCenter>
      <div>
        <Button type="emphasis" onClick={save} loading={submitting}>
          <span>保存</span>
        </Button>
        <Spacer x={0.3} inline />
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
          发布
        </Button>
      </div>
    </div>
  );
};
