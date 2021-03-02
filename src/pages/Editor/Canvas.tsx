import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Material } from "../../types";
import ErrorBoundary from "./ErrorBoundary";
import { materials } from "./MaterialList";

const ComponentWrap: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="ComponentWrap">{children}</div>;
};

const Canvas = () => {
  const [components, setComponents] = useState<Material[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const materialId = e.dataTransfer.getData("material");
    const material = materials.filter((m) => m.id === materialId)[0];
    if (material) {
      setComponents((p) => [...p, material]);
      toast.success(`添加物料成功: ${material.zhName}`);
    } else {
      toast.error("没有找到物料");
    }
  };

  // Note: 需要这个才能触发 onDrop
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    // window.onbeforeunload = function () {
    //   return "你确定离开吗?";
    // };
  }, []);

  return (
    <section className="Canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ErrorBoundary>
        {components.map((c) => {
          return (
            <ComponentWrap key={c.id}>
              <c.component />
            </ComponentWrap>
          );
        })}
      </ErrorBoundary>
    </section>
  );
};

export default Canvas;
