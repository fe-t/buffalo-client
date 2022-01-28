import React, { FC } from "react";
import { SetStateExecutionConfig } from "../../widgets/TableColumnsEditor/SetStateExecutionConfig";
import { NavigateToConfig } from "./NavigateToConfig";

interface Props {
  action?: string;
  execution?: string;
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
      ].filter(Boolean)}
    </>
  );
};
