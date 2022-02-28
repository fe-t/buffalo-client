import classNames from "classnames";
import { isArray } from "lodash";
import React, {
  ElementType,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  DndProvider,
  DropTargetMonitor,
  useDrag,
  useDrop,
  XYCoord,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

const ComponentWrap = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    canvasComponent: CanvasComponent;
    opacity: number;
    handlerId: any;
  }>
>(function ComponentWrapForwardRef(
  { children, canvasComponent, opacity, handlerId },
  ref: React.Ref<HTMLDivElement>
) {
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
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
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
});

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DrapComponent: FC<{
  index: number;
  component: CanvasComponent;
  children: (props: {
    ref: React.RefObject<HTMLDivElement>;
    opacity: number;
    handlerId: any;
  }) => ReactElement;
}> = ({ children, index, component }) => {
  const ref = useRef<HTMLDivElement>(null);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    console.log("moveCard", dragIndex, hoverIndex);
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: component.id, index: index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return <>{children({ ref, opacity, handlerId })}</>;
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
          .map((c, i) => {
            const ComponentType = componentMap.get(c.materialId) as ElementType;
            let children: any = c.props.children; // TODO: fix type
            if (isArray(children)) {
              children = <>{renderComponents(children)}</>;
            }
            return (
              <DrapComponent index={i} component={c} key={c.id}>
                {({ ref, handlerId, opacity }) => {
                  return (
                    <ComponentWrap
                      // key={c.id}
                      canvasComponent={c}
                      ref={ref}
                      opacity={opacity}
                      handlerId={handlerId}
                    >
                      <ErrorBoundary>
                        {ComponentType && (
                          <ComponentType
                            {...c.props}
                            children={children}
                            style={c.style}
                          />
                        )}
                      </ErrorBoundary>
                    </ComponentWrap>
                  );
                }}
              </DrapComponent>
            );
          })
      : null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="Canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={unsetCursor}
      >
        <ErrorBoundary>{renderComponents(components)}</ErrorBoundary>
      </div>
    </DndProvider>
  );
};

export default Canvas;
