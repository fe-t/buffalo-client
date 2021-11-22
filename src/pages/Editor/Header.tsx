import { Button, Icon, Spacer } from "@yy/tofu-ui-react";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParamsBy } from "../../hooks";
import { saveDetail } from "../../service";
import { useAppSelector } from "../../store";
import { FlexCenter } from "../../widgets/styled";

export const Header = () => {
  const id = useParamsBy("id");
  const save = async () => {
    try {
      await saveDetail({ id });
      toast("保存成功");
    } catch (e) {
      console.error(e);
      toast.error((e as any).message);
    }
  };
  const appName = useAppSelector((s) => s.editor.present.appName);

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
        <Button type="emphasis" onClick={save}>
          <span>保存</span>
        </Button>
      </div>
    </div>
  );
};
