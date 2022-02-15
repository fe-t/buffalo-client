import React, { FC } from "react";
import { SetStateExecutionConfig } from "../../widgets/TableColumnsEditor/SetStateExecutionConfig";
import { PlatformActionExecutions, PlatformActions } from "./action-controls";
import { ShowToastConfig } from "./ExecutionConfigs/ShowToastConfig";
import { NavigateToConfig } from "./NavigateToConfig";

interface Props {
  action?: PlatformActions;
  execution?: PlatformActionExecutions;
}

export const ExecutionConfigEditor: FC<Props> = ({ action, execution }) => {
  const name = `${action}.${execution}`;
  return (
    <>
      {[
        execution === "setState" && (
          <SetStateExecutionConfig name={name} key="1" />
        ),
        execution === "showModal" && <p key="2">showModal</p>,
        execution === "navigateTo" && <NavigateToConfig name={name} key="3" />,
        execution === "showToast" && <ShowToastConfig name={name} key="4" />,
      ].filter(Boolean)}
    </>
  );
};
