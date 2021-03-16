import { Popover } from "@yy/tofu-ui-react";
import React, { FC } from "react";
import { SketchPicker } from "react-color";
import { MdLink } from "react-icons/md";

const ColorPicker: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="ColorPicker">
      <Popover
        showArrow={false}
        trigger="click"
        popupElClassName="ColorPickerPopper"
        reference={
          <div className="ColorPickerBtn">
            <div
              className="ColorPickerBtnColor"
              style={{ backgroundColor: value }}
            />
            <div className="ColorPickerSymbol">
              <MdLink />
            </div>
          </div>
        }
      >
        {/* TODO: support alpha */}
        <SketchPicker color={value} onChangeComplete={(c) => onChange(c.hex)} />
      </Popover>
    </div>
  );
};

export default ColorPicker;
