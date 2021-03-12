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
import { MdContentCopy, MdDelete } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteCursorComponent,
  selectCursorComponent,
  updateComponentProp,
} from "../../store/editor/editorSlice";
import { PropItem } from "../../types";
import { FlexCenter, FlexEnd } from "../../widgets/styled";

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
  const dispatch = useAppDispatch();
  const component = useAppSelector(selectCursorComponent);
  const propList = ((component && component.props) || []) as PropItem[];

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
              <Link block className="InfoTypeLink">
                <MdContentCopy size="18" />
              </Link>
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
