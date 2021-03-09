import { Popover } from "@yy/tofu-ui-react";
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
import {
  addComponent,
  componentMap,
  cursorComponentBlur,
  selectComponents,
  selectCursorComponentId,
  selectMaterials,
  setCursorComponentId,
} from "../../store/editor/editorSlice";
import { CanvasComponent } from "../../types";
import ErrorBoundary from "./ErrorBoundary";
import PropsController from "./PropsController";

const ComponentWrap: FC<
  PropsWithChildren<{ canvasComponent: CanvasComponent }>
> = ({ children, canvasComponent }) => {
  const dispatch = useAppDispatch();
  const cursorComponentId = useAppSelector(selectCursorComponentId);
  const [v, setV] = useState(false);

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

  useEffect(() => {
    setV(isActive);
  }, [isActive]);

  return (
    <Popover
      alwaysVisible={v}
      popupElClassName="PropControllPopper"
      reference={
        <div
          className={classNames("ComponentWrap", { active: isActive })}
          onClick={handleClick}
        >
          {children}
          <div className="TopLeftDot ResizeDot" />
          <div className="TopRightDot ResizeDot" />
          <div className="BottomLeftDot ResizeDot" />
          <div className="BottomRightDot ResizeDot" />
        </div>
      }
    >
      <PropsController />
    </Popover>
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
      dispatch(cursorComponentBlur());
    }
  }, [cursorComponentId, dispatch]);

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
