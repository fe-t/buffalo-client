import { Card, Spacer } from "@yy/tofu-ui-react";
import React from "react";
import { useAppSelector } from "../../store";
import { selectMaterials } from "../../store/editor/editorSlice";

const MaterialList = () => {
  const materials = useAppSelector(selectMaterials);

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
