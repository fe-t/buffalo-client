import Slider from "@reach/slider";
import "@reach/slider/styles.css";
import { InputNumber } from "@yy/tofu-ui-react";
import { debounce } from "lodash";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { RenderPropsItem } from "../types";

const NumberEditor: FC<{
  propItem: RenderPropsItem;
  onChange: (val: any) => void;
}> = ({ propItem: p, onChange }) => {
  const [selfValue, setSelfValue] = useState(p.value);

  const triggerOutSideChange = useMemo(() => debounce(onChange, 200), [
    onChange,
  ]);

  const handleChange = useCallback(
    (v) => {
      setSelfValue(v);
      triggerOutSideChange(v);
    },
    [triggerOutSideChange]
  );

  useEffect(() => {
    setSelfValue(p.value);
  }, [p.value]);

  return (
    <div className="NumberEditor">
      <Slider value={selfValue} min={0} max={100} onChange={handleChange} />
      <InputNumber
        value={selfValue}
        suffix={p.extend?.unit}
        min={0}
        max={100}
        onChange={(v) => setSelfValue(Number(v))}
        onBlur={() => onChange(selfValue)}
      />
    </div>
  );
};

export default NumberEditor;
