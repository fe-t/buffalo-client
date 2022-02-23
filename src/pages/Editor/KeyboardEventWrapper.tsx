import { useKeyPress } from "ahooks";
import React, { FC, PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useParamsBy } from "../../hooks";
import { saveDetail } from "../../service";
import { useAppSelector } from "../../store";
import { sleep } from "../../util";

interface Props {
  onSaveSuccess: () => void;
}
export const KeyboardEventWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  onSaveSuccess,
}) => {
  const versionId = useParamsBy("versionId");
  const components = useAppSelector((s) => s.editor.present.components);
  const dataSource = useAppSelector((s) => s.dataSource);

  useKeyPress(["ctrl.s", "meta.s"], async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const toastId = toast.loading("保存中...");
    try {
      await saveDetail({ versionId, components, dataSource });
      await sleep(500);
      toast.success("保存成功");
      onSaveSuccess();
    } catch (e) {
      toast.error("保存失败");
      console.error(e);
    } finally {
      toast.dismiss(toastId);
    }
  });

  return <>{children}</>;
};
