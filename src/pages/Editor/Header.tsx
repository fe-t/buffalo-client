import { Button, Icon, Spacer } from "@yy/tofu-ui-react";
import dayjs from "dayjs";
import { version } from "process";
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
  const [submitting, setSubmitting] = useState(false);

  const save = async () => {
    try {
      setSubmitting(true);
      await saveDetail({ versionId, components });
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
        <span>{versionInfo.version_config?.name}</span>
        <Spacer x={1} inline />
        <div className="UpdateTime">
          <Icon type="RoundCheck" size="small" />
          <Spacer x={0.3} inline />
          最后更新于{" "}
          {dayjs(Number(versionInfo.update_time)).format(DATETIME_FORMAT)}
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
              `http://localhost:3000/app/?${qs.stringify({ versionId })}`,
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
