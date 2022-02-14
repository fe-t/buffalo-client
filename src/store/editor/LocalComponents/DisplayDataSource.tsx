import { Card } from "@yy/tofu-ui-react";
import React from "react";
import { useAppSelector } from "../..";

export const DisplayDataSource = () => {
  const dataSource = useAppSelector((s) => s.dataSource);
  return (
    <Card>
      <pre>{JSON.stringify(dataSource, null, 2)}</pre>
    </Card>
  );
};
