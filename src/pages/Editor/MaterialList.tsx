import { Card, Spacer, Tabs } from "@yy/tofu-ui-react";
import React, { useState } from "react";
import { useAppSelector } from "../../store";
import { selectMaterials } from "../../store/editor/editorSlice";
import DisplayIcon from "../../widgets/DisplayIcon";
import SelectIcon from "../../assets/icons/select.svg";

const MaterialList = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const materials = useAppSelector(selectMaterials);

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("material", e.target.dataset.material);
  };

  return (
    <div className="MaterialContainer">
      <Tabs
        className="MaterialTabs"
        value={selectedTab}
        onChange={setSelectTab}
      >
        <Tabs.Tab label="块" />
        <Tabs.Tab label="元件" />
      </Tabs>
      <div className="MaterialList " onDragStart={handleDragStart}>
        <Tabs.TabPane value={selectedTab} index={0}>
          {materials.map((m) => (
            <React.Fragment key={m.id}>
              <Card
                className="MaterialItem"
                size="small"
                draggable
                data-material={m.id}
                hoverable
              >
                {m.name} - {m.zhName}
              </Card>
              <Spacer y={0.5} />
            </React.Fragment>
          ))}
        </Tabs.TabPane>
      </div>
    </div>
  );
};

export default MaterialList;
