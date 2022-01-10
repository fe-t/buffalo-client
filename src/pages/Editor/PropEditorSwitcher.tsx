import { Input, Select, Switch, TextArea } from "@yy/tofu-ui-react";
import React, { FC, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateComponentProp } from "../../store/editor/editorSlice";
import {
  selectCursorComponent,
  selectMaterials,
} from "../../store/editor/selectors";
import { RenderPropsItem } from "../../types/index";
import { CodeModalEditor } from "../../widgets/CodeModalEditor";
import ColorPicker from "../../widgets/ColorPicker";
import NumberEditor from "../../widgets/NumberEditor";
import { TableColumnsEditor } from "../../widgets/TableColumnsEditor/TableColumnsEditor";
import { ControlType } from "./property-controls";

const PropEditorSwitcher: FC<{ propItem: RenderPropsItem }> = ({
  propItem: p,
}) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector(selectCursorComponent);
  const materials = useAppSelector(selectMaterials);

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
    <>
      {/* 布尔类型 */}
      {p.type === ControlType.Boolean && (
        <Switch
          checked={p.value}
          onChange={(e) => handlePropChange(p.name, e.target.checked)}
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
      {/* 数字类型 */}
      {p.type === ControlType.Number && (
        <NumberEditor
          propItem={p}
          onChange={(v) => handlePropChange(p.name, v)}
        />
      )}
      {/* 组件实例 */}
      {p.type === ControlType.ComponentInstance && (
        <Select
          placeholder={p.placeholder}
          value={p.value}
          onChange={(v) => handlePropChange(p.name, v)}
        >
          {materials.map((material) => (
            <Select.Option key={material.id} value={material.id}>
              {material.name}
            </Select.Option>
          ))}
        </Select>
      )}
      {/* 文本框 */}
      {p.type === ControlType.TextField && (
        <TextArea
          autoSize
          placeholder={p.placeholder}
          value={p.value}
          onChange={(v) => handlePropChange(p.name, v)}
        />
      )}
      {/* 代码输入框 */}
      {p.type === ControlType.CodeField && (
        <CodeModalEditor
          value={p.value}
          onChange={(v) => handlePropChange(p.name, v)}
        />
      )}
      {p.type === ControlType.TableColumns && (
        <TableColumnsEditor
          value={p.value}
          onChange={(v) => handlePropChange(p.name, v)}
        />
      )}
    </>
  );
};

export default PropEditorSwitcher;
