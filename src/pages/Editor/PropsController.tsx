import {
  Empty,
  Input,
  Link,
  Popover,
  Select,
  Spacer,
  Switch,
  Tooltip,
} from "@yy/tofu-ui-react";
import { capitalize } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { MdContentCopy, MdDelete, MdInfoOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteCursorComponent,
  selectCursorComponent,
  updateComponentProp,
} from "../../store/editor/editorSlice";
import { componentMap } from "../../store/editor/registerComponents";
import { PropsItem } from "../../types";
import {
  default as Collapse,
  default as Collpase,
} from "../../widgets/Collapse";
import ColorPicker from "../../widgets/ColorPicker";
import { FlexCenter, FlexEnd, FlexStart } from "../../widgets/styled";
import { ControlType } from "./property-controls";

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

interface RenderPropsItem extends PropsItem {
  name: string;
}

const PropsController = () => {
  const dispatch = useAppDispatch();
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

  const handlePropChange = useCallback(
    (propKey: string, propValue: any) => {
      if (component) {
        dispatch(
          updateComponentProp({
            componentId: component.id,
            propKey,
            propValue,
          })
        );
      }
    },
    [component, dispatch]
  );

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
                      <div>
                        {/* 布尔类型 */}
                        {p.type === ControlType.Boolean && (
                          <Switch
                            checked={p.value}
                            onChange={(e) =>
                              handlePropChange(p.name, e.target.checked)
                            }
                          />
                        )}
                        {/* 字符串类型 */}
                        {p.type === ControlType.String && (
                          <Input
                            placeholder={p.placeholder}
                            value={p.value}
                            onBlur={(e) => {
                              handlePropChange(p.name, e.target.value);
                            }}
                          />
                        )}
                        {/* 选项（枚举）类型 */}
                        {p.type === ControlType.Enum && (
                          <Select
                            placeholder={p.placeholder}
                            value={p.value}
                            onChange={(val) => {
                              handlePropChange(p.name, val);
                            }}
                          >
                            {p.options &&
                              p.options.map((o) => (
                                <Select.Option key={o.value} value={o.value}>
                                  {o.label}
                                </Select.Option>
                              ))}
                          </Select>
                        )}
                        {/* 颜色类型 */}
                        {p.type === ControlType.Color && (
                          <ColorPicker
                            value={p.value}
                            onChange={(c) => handlePropChange(p.name, c)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Collapse>
            <Collpase title="样式">
              <p>样式</p>
            </Collpase>
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
