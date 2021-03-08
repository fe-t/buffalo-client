import classNames from "classnames";
import React, { FC, PropsWithChildren, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addComponent,
  componentMap,
  setCursorComponentId,
} from "../../store/editor/editorSlice";
import { CanvasComponent } from "../../types";
import ErrorBoundary from "./ErrorBoundary";

const ComponentWrap: FC<
  PropsWithChildren<{ canvasComponent: CanvasComponent }>
> = ({ children, canvasComponent }) => {
  const dispatch = useAppDispatch();
  const cursorComponentId = useAppSelector(
    (state) => state.editor.cursorComponentId
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(setCursorComponentId(canvasComponent.id));
    },
    [canvasComponent.id, dispatch]
  );

  const isActive = useMemo(() => {
    return canvasComponent.id === cursorComponentId;
  }, [canvasComponent.id, cursorComponentId]);

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
  const materials = useAppSelector((state) => state.editor.materials);
  const components = useAppSelector((state) => state.editor.components);
  const dispatch = useAppDispatch();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const materialId = e.dataTransfer.getData("material");
    const material = materials.filter((m) => m.id === materialId)[0];
    if (material) {
      dispatch(addComponent(material));

      // dispatch();
      toast.success(`添加物料成功: ${material.zhName}`);
    } else {
      toast.error("没有找到物料");
    }
  };

  // Note: 需要这个才能触发 onDrop
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  // 监听在 document 点击事件，取消选择
  const unsetCursor = useCallback(() => {
    dispatch(setCursorComponentId(""));
  }, [dispatch]);

  return (
    <section
      className="Canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={unsetCursor}
    >
      <ErrorBoundary>
        {components.map((c) => {
          const ComponentType = componentMap.get(c.materialId);
          const props = c.props?.reduce(
            (acc, cur) => ({ ...acc, [cur.name]: cur.value }),
            {}
          );
          return (
            <ComponentWrap key={c.id} canvasComponent={c}>
              {ComponentType && <ComponentType {...props} />}
            </ComponentWrap>
          );
        })}
      </ErrorBoundary>
    </section>
  );
};

export default Canvas;