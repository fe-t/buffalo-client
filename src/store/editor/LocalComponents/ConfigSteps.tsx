import { StepProps, Steps } from "antd";
import React, { FC } from "react";

interface Props {
  routes: string;
  current: number;
}
type NativeAttrs = Omit<StepProps, keyof Props>;
export type ConfigStepsProps = NativeAttrs & Props;

export const ConfigSteps: FC<ConfigStepsProps> = ({
  routes,
  current,
  ...props
}) => {
  const configs = routes ? JSON.parse(routes) : [];
  return (
    <Steps current={current} {...props}>
      {configs.map((c: any, i: number) => (
        <Steps.Step title={c.title} key={i} />
      ))}
    </Steps>
  );
};
