import React, { FC } from "react";
import { FlexCenter, FlexStart } from "./styled";
import { StyleModalEditor } from "./StyleModalEditor";
import { default as Collapse } from "./Collapse";
import { CanvasComponent } from "../types";
import { useAppDispatch } from "../store";
import { updateComponentStyle } from "../store/editor/editorSlice";

interface Props {
  component: CanvasComponent;
}
export const ComponentStyleEditor: FC<Props> = ({ component }) => {
  const style = component.style;
  const dispatch = useAppDispatch();

  return (
    <>
      <FlexCenter style={{ padding: 10 }}>
        <StyleModalEditor
          value={style}
          onChange={(val) => {
            dispatch(
              updateComponentStyle({ componentId: component.id, style: val })
            );
          }}
        />
      </FlexCenter>
      <Collapse.Group>
        <Collapse title="布局" defaultOpen>
          布局
        </Collapse>
        <Collapse title="定位" defaultOpen>
          <p>定位</p>
        </Collapse>
        <Collapse title="字体" defaultOpen>
          <p>字体</p>
        </Collapse>
      </Collapse.Group>
    </>
  );
};
