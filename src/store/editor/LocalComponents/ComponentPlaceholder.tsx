import React, { FC, ReactNode } from "react";
import { FlexCenter } from "../../../widgets/styled";

export const ComponentPlaceholder: FC<{ text?: ReactNode }> = ({ text }) => {
  return (
    <FlexCenter style={{ height: "40px", border: "1px solid #ebebeb" }}>
      {text}
    </FlexCenter>
  );
};
