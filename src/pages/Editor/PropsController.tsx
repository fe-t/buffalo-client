import { Empty, Link, Popover, Spacer, Tooltip } from "@yy/tofu-ui-react";
import { capitalize } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { MdContentCopy, MdDelete, MdInfoOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteCursorComponent,
  selectCursorComponent,
} from "../../store/editor/editorSlice";
import { componentMap } from "../../store/editor/registerComponents";
import { RenderPropsItem } from "../../types";
import { default as Collapse } from "../../widgets/Collapse";
import { FlexCenter, FlexEnd, FlexStart } from "../../widgets/styled";
import PropEditorSwitcher from "./PropEditorSwitcher";

const CopyComponentBtn = () => {
  const handleClick = useCallback(() => {
    toast.success("复制成功");
  }, []);

  return (
    <Link block className="InfoTypeLink" onClick={handleClick}>
      <MdContentCopy size="18" />
    </Link>
  );
};

const DeleteComponentBtn = () => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      placement="left"
      trigger="click"
      popupElClassName="PopoverPopup"
      alwaysVisible={visible}
      reference={
        <Link block className="InfoTypeLink" onClick={() => setVisible(true)}>
          <MdDelete size="18" />
        </Link>
      }
    >
      <Spacer y={0.5} />
      <p>确认删除该组件吗？</p>
      <Spacer y={1} />
      <FlexEnd className="PopoverCtrl">
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            setVisible(false);
          }}
        >
          取消
        </Link>
        <Spacer inline x={1} />
        <Link
          block
          onClick={() => {
            dispatch(deleteCursorComponent());
            setVisible(false);
          }}
        >
          确认
        </Link>
      </FlexEnd>
    </Popover>
  );
};

const PropsController = () => {
  const component = useAppSelector(selectCursorComponent);

  const componentType = componentMap.get(component?.materialId);
  const propList = useMemo(() => {
    return Object.entries(componentType?.propertyControls || {}).reduce(
      (acc: RenderPropsItem[], [propName, propInfo]) => {
        const item = { ...propInfo, name: propName };
        // 如果 Canvas组件有值，读取 canvas 组件的值
        if (component?.props[propName]) {
          item.value = component?.props[propName];
        }
        return [...acc, item];
      },
      []
    );
  }, [component?.props, componentType?.propertyControls]);

  return (
    <section className="PropsController" onClick={(e) => e.stopPropagation()}>
      {component ? (
        <div className="PropsPane">
          <div className="PropsPaneHeader">
            <p>
              <span>{component.name}</span>
              <span>{component.zhName}</span>
            </p>
            <FlexCenter>
              <CopyComponentBtn />
              <DeleteComponentBtn />
            </FlexCenter>
          </div>
          <Collapse.Group>
            <Collapse title="组件属性" defaultOpen>
              <div className="PropsPaneFields">
                {propList.map((p) => {
                  return (
                    <div
                      className="PropsPaneField"
                      key={`${p.name}-${component?.id}`}
                    >
                      <div className="PropsPaneFieldTitle">
                        <FlexStart>
                          <span>{p.label}</span>
                          <Spacer inline x={0.3} />
                          <span>{capitalize(p.name)}</span>
                          {p.desc && (
                            <>
                              <Spacer inline x={0.3} />
                              <Tooltip text={p.desc}>
                                <MdInfoOutline
                                  size="16"
                                  style={{ marginTop: 4 }}
                                />
                              </Tooltip>
                            </>
                          )}
                        </FlexStart>
                      </div>
                      <Spacer y={0.5} />
                      <PropEditorSwitcher propItem={p} />
                    </div>
                  );
                })}
              </div>
            </Collapse>
            <Collapse title="样式">
              <p>样式</p>
            </Collapse>
          </Collapse.Group>
        </div>
      ) : (
        <>
          <Spacer y={2} />
          <Empty text="请在画布选择一个组件来编辑属性" />
        </>
      )}
    </section>
  );
};

export default PropsController;
