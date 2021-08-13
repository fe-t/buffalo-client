import { Tree } from "antd";
import React from "react";

const ComponentTree = () => {
  return (
    <div className="ComponentTree">
      <div className="ComponentTreeName">大纲树</div>
      <div className="ComponentTreeContent">
        <Tree
          treeData={[
            {
              title: "parent 1",
              key: "0-0",
              children: [
                {
                  title: "parent 1-0",
                  key: "0-0-0",
                  children: [
                    {
                      title: "leaf",
                      key: "0-0-0-0",
                    },
                    {
                      title: "leaf",
                      key: "0-0-0-1",
                    },
                    {
                      title: "leaf",
                      key: "0-0-0-2",
                    },
                  ],
                },
                {
                  title: "parent 1-1",
                  key: "0-0-1",
                  children: [
                    {
                      title: "leaf",
                      key: "0-0-1-0",
                    },
                  ],
                },
                {
                  title: "parent 1-2",
                  key: "0-0-2",
                  children: [
                    {
                      title: "leaf",
                      key: "0-0-2-0",
                    },
                    {
                      title: "leaf",
                      key: "0-0-2-1",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ComponentTree;
