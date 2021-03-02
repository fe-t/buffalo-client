import { Card, Datagrid, Input, Select, Spacer } from "@yy/tofu-ui-react";
import React from "react";
import { Material } from "../../types";

export const materials: Material[] = [
  {
    id: "1",
    name: "Dategrid",
    zhName: "数据网格",
    component: Datagrid,
  },
  {
    id: "2",
    name: "Input",
    zhName: "输入框",
    component: Input,
    props: [
      {
        name: "placeholder",
        type: "string",
      },
      {
        name: "disabled",
        type: "boolean",
      },
      {
        name: "name",
        type: "string",
      },
    ],
  },
  {
    id: "3",
    name: "Select",
    zhName: "选择器",
    component: Select,
  },
];

const MaterialList = () => {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("material", e.target.dataset.material);
  };

  return (
    <section className="MaterialList " onDragStart={handleDragStart}>
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
    </section>
  );
};

export default MaterialList;
