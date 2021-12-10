import { Card, Empty, Icon, Input, Spacer } from "@yy/tofu-ui-react";
import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../store";
import { selectMaterials } from "../../store/editor/editorSlice";

const MaterialList = () => {
  const materials = useAppSelector(selectMaterials);
  const [query, setQuery] = useState<string>("");

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("material", e.target.dataset.material);
  };

  const handleQueryChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const displayingMaterials = useMemo(() => {
    return materials.filter(
      (m) =>
        m.name.includes(query) ||
        m.type.includes(query) ||
        m.zhName.includes(query)
    );
  }, [materials, query]);

  return (
    <div className="MaterialContainer">
      <div className="MaterialSearch">
        <Input
          className="FramelessInput"
          prefix={<Icon type="Search" />}
          placeholder="搜索组件"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className="MaterialList " onDragStart={handleDragStart}>
        {displayingMaterials.length ? (
          displayingMaterials.map((m) => (
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
          ))
        ) : (
          <Empty text="没有找到组件" />
        )}
      </div>
    </div>
  );
};

export default MaterialList;
