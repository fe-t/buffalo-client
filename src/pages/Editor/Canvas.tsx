import classNames from "classnames";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCursorComponent } from "../../store/editor/editorSlice";
import { Material } from "../../types";
import ErrorBoundary from "./ErrorBoundary";

const ComponentWrap: FC<PropsWithChildren<{ material: Material }>> = ({
  children,
  material,
}) => {
  const dispatch = useAppDispatch();
  const cursorComponent = useAppSelector(
    (state) => state.editor.cursorComponent
  );

  const handleClick = useCallback(() => {
    dispatch(setCursorComponent(material));
  }, [dispatch, material]);

  const isActive = useMemo(() => {
    return material.id === cursorComponent?.id;
  }, [cursorComponent, material.id]);

  return (
    <div
      className={classNames("ComponentWrap", { active: isActive })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const Canvas = () => {
  const [components, setComponents] = useState<Material[]>([]);
  const materials = useAppSelector((state) => state.editor.materials);

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
            <ComponentWrap key={c.id} material={c}>
              <c.component />
            </ComponentWrap>
          );
        })}
      </ErrorBoundary>
    </section>
  );
};

export default Canvas;
