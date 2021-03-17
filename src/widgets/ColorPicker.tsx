import { Popover } from "@yy/tofu-ui-react";
import React, { FC, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { MdLink } from "react-icons/md";

const ColorPicker: FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [selfValue, setSelfValue] = useState("");

  useEffect(() => {
    setSelfValue(value);
  }, [value]);

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
        <SketchPicker
          color={selfValue}
          onChange={(c) => setSelfValue(c.hex)}
          onChangeComplete={(c) => onChange(c.hex)}
        />
      </Popover>
    </div>
  );
};

export default ColorPicker;
