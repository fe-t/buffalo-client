import React from "react";
import { useAppSelector } from "../..";

export const DisplayDataSource = () => {
  const dataSource = useAppSelector((s) => s.dataSource);
  return <code>{JSON.stringify(dataSource, null, 2)}</code>;
};
