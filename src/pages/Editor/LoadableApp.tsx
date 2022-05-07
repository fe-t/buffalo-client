import { loadMicroApp, MicroApp } from "qiankun";
import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import componentMap from "../../componentMap";
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

  const helper: any = (key: string, component: ComponentType) => {
    if (!componentMap.has(key)) {
      componentMap.set(key, component);
    }
    console.log("componentMap", componentMap);
  };

  useEffect(() => {
    microAppInstance.current = loadMicroApp({
      name: id,
      entry: material.src,
      container: `#${id}`,
      props: {
        buffaloMaterial: material,
        buffaloMaterialProps: props,
        helper,
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
