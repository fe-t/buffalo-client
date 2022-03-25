import { loadMicroApp, MicroApp } from "qiankun";
import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Material } from "../../types";

interface Props {
  id: string;
  material: Material;
  [k: string]: any;
}
export const LoadableApp: FC<PropsWithChildren<Props>> = ({
  children,
  id,
  material,
  ...props
}) => {
  const microAppInstance = useRef<MicroApp | null>(null);

  useEffect(() => {
    microAppInstance.current = loadMicroApp({
      name: id,
      entry: material.src,
      container: `#${id}`,
      props: {
        buffaloMaterial: material,
        buffaloMaterialProps: props,
      },
    });
    return () => {
      microAppInstance.current = null;
    };
    // 只会初始化一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (microAppInstance.current?.getStatus() === "MOUNTED") {
      console.log("new props", props);
      microAppInstance.current?.update?.({ ...props });
    }
  }, [props]);

  return <div id={id}></div>;
};
