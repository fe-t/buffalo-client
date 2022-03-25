import classNames from "classnames";
import { isArray } from "lodash";
import React, {
  ElementType,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addComponent,
  selectComponents,
  selectCursorComponent,
  selectCursorComponentId,
  selectMaterials,
  setCursorComponentId,
} from "../../store/editor/editorSlice";
import { componentMap } from "../../store/editor/registerComponents";
import { CanvasComponent } from "../../types";
import ErrorBoundary from "./ErrorBoundary";
import { LoadableApp } from "./LoadableApp";

const ComponentWrap: FC<
  PropsWithChildren<{
    canvasComponent: CanvasComponent;
  }>
> = ({ children, canvasComponent }) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector(selectCursorComponent);
  const cursorComponentId = useAppSelector(selectCursorComponentId);

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

  // Note: 需要这个才能触发 onDrop
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // debugger;
  };

  return (
    <div
      className={classNames("ComponentWrap", { active: isActive })}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
      <div className="TopLeftDot ResizeDot" />
      <div className="TopRightDot ResizeDot" />
      <div className="BottomLeftDot ResizeDot" />
      <div className="BottomRightDot ResizeDot" />
      <div className="ComponentWrapTitle">{component?.zhName}</div>
    </div>
  );
};

const Canvas = () => {
  const materials = useAppSelector(selectMaterials);
  const components = useAppSelector(selectComponents);
  const cursorComponentId = useAppSelector(selectCursorComponentId);
  const dispatch = useAppDispatch();

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const materialId = e.dataTransfer.getData("material");
    const material = materials.filter((m) => m.id === materialId)[0];
    if (material) {
      dispatch(addComponent(material));
      toast.success(`添加物料成功: ${material.zhName}`);
    } else {
      toast.error("没有找到物料");
    }
  };

  // Note: 需要这个才能触发 onDrop
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const unsetCursor = useCallback(() => {
    if (cursorComponentId) {
      // dispatch(cursorComponentBlur());
    }
  }, [cursorComponentId]);

  const renderComponents = (components: CanvasComponent[]) => {
    return components
      ? components
          .filter((c) => c.visible) // 控制画布显示隐藏
          .map((c) => {
            const ComponentType = componentMap.get(c.materialId) as ElementType;
            const material = materials.filter((m) => m.id === c.materialId)[0];

            let children: any = c.props.children; // TODO: fix type
            if (isArray(children)) {
              children = <>{renderComponents(children)}</>;
            }

            return (
              <ComponentWrap key={c.id} canvasComponent={c}>
                <ErrorBoundary>
                  {ComponentType && (
                    <LoadableApp
                      {...c.props}
                      children={children}
                      style={c.style}
                      id={c.id} // 使qiankun能找到它
                      material={material}
                    />
                  )}
                </ErrorBoundary>
              </ComponentWrap>
            );
          })
      : null;
  };

  return (
    <div
      className="Canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={unsetCursor}
    >
      <ErrorBoundary>{renderComponents(components)}</ErrorBoundary>
    </div>
  );
};

export default Canvas;
