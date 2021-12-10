import { Button, Icon, Spacer } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParamsBy } from "../../hooks";
import { saveDetail } from "../../service";
import { useAppSelector } from "../../store";
import { FlexCenter } from "../../widgets/styled";

export const Header = () => {
  const id = useParamsBy("id");
  const appName = useAppSelector((s) => s.editor.present.appName);
  const components = useAppSelector((s) => s.editor.present.components);
  const [submitting, setSubmitting] = useState(false);

  const save = async () => {
    try {
      setSubmitting(true);
      await saveDetail({ id, components });
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
        <span>{appName}</span>
        <Spacer x={1} inline />
        <div className="UpdateTime">
          <Icon type="RoundCheck" size="small" />
          <Spacer x={0.3} inline />
          最后更新与11-21 18:00
        </div>
      </FlexCenter>
      <div>
        <Button type="emphasis" onClick={save} loading={submitting}>
          <span>保存</span>
        </Button>
      </div>
    </div>
  );
};
