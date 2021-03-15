import {
  Divider,
  Empty,
  Input,
  Link,
  Popover,
  Spacer,
  Switch,
} from "@yy/tofu-ui-react";
import { capitalize } from "lodash";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  componentMap,
  deleteCursorComponent,
  selectCursorComponent,
  updateComponentProp,
} from "../../store/editor/editorSlice";
import { PropsItem } from "../../types";
import { FlexCenter, FlexEnd } from "../../widgets/styled";

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
  const propList = Object.entries(componentType?.propertyControls || {}).reduce(
    (acc: RenderPropsItem[], cur) => {
      return [...acc, { ...cur[1], name: cur[0] }];
    },
    []
  );

  const handlePropChange = useCallback(
    (index: number, propValue: any) => {
      if (component) {
        dispatch(
          updateComponentProp({
            componentId: component.id,
            propIndex: index,
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
          <div className="PropsPaneFields">
            {propList.map((p, index) => {
              return (
                <div className="PropsPaneField" key={p.name}>
                  <div className="PropsPaneFieldTitle">
                    <span>{p.zhName}</span>
                    <Spacer inline x={0.3} />
                    <span>{capitalize(p.name)}</span>
                  </div>
                  <Spacer y={0.5} />
                  <div>
                    {p.type === "boolean" && (
                      <Switch
                        checked={p.value}
                        onChange={(e) =>
                          handlePropChange(index, e.target.checked)
                        }
                      />
                    )}
                    {p.type === "string" && (
                      <Input
                        defaultValue={p.value}
                        onBlur={(e) => {
                          debugger;
                          handlePropChange(index, e.target.value);
                        }}
                      />
                    )}
                  </div>
                  <Divider />
                </div>
              );
            })}
          </div>
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
