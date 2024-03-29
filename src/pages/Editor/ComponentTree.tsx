import { Empty, Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import { capitalize } from "lodash";
import React, { useMemo } from "react";
import { useAppSelector } from "../../store";
import { CanvasComponent } from "../../types";

const ComponentTree = () => {
  const components = useAppSelector((s) => s.editor.present.components);

  const treeData = useMemo(() => {
    const travelTree = (components: CanvasComponent[]): DataNode[] => {
      return components.map((node) => {
        return {
          title: (
            <span>
              {node.zhName} - {capitalize(node.name)} #{node.id}
            </span>
          ),
          key: node.id,
          children: node.props.children
            ? travelTree(node.props.children as any)
            : undefined,
        };
      });
    };
    return travelTree(components);
  }, [components]);

  return (
    <div className="ComponentTree">
      <div className="ComponentTreeName">大纲树</div>

      <div className="ComponentTreeContent">
        {treeData.length ? (
          <Tree autoExpandParent showLine treeData={treeData} />
        ) : (
          <Empty description="没有内容" />
        )}
      </div>
    </div>
  );
};

export default ComponentTree;
