import React, { FC } from "react";
import { SetStateExecutionConfig } from "./ExecutionConfigs/SetStateExecutionConfig";
import { PlatformActionExecutions, PlatformActions } from "./action-controls";
import { ShowToastConfig } from "./ExecutionConfigs/ShowToastConfig";
import { NavigateToConfig } from "./ExecutionConfigs/NavigateToConfig";
import { ShowModalConfig } from "./ExecutionConfigs/ShowModalConfig";
import { CustomExecutionConfig } from "./ExecutionConfigs/CustomExecutionConfig";

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
          <SetStateExecutionConfig name={name} key="setState" />
        ),
        execution === "showModal" && (
          <ShowModalConfig name={name} key="showModal" />
        ),
        execution === "navigateTo" && (
          <NavigateToConfig name={name} key="navigateTo" />
        ),
        execution === "showToast" && (
          <ShowToastConfig name={name} key="showToast" />
        ),
        execution === "customExecution" && (
          <CustomExecutionConfig name={name} key="customExecution" />
        ),
      ].filter(Boolean)}
    </>
  );
};
