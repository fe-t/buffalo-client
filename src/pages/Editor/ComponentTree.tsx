import { Button, Empty, Tree } from "antd";
import { Key } from "antd/lib/table/interface";
import { DataNode } from "antd/lib/tree";
import classNames from "classnames";
import { isEmpty } from "lodash";
import React, { FC, useMemo } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  hideComponent,
  selectCursorComponentId,
  setCursorComponentId,
  showComponent,
} from "../../store/editor/editorSlice";
import { CanvasComponent } from "../../types";
import { FlexExpand } from "../../widgets/styled";

const NodeTitle: FC<{
  title: string;
  active: boolean;
  componentId: string;
}> = ({ title, active, componentId }) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector(
    (s) => s.editor.present.components.filter((x) => x.id === componentId)[0]
  );
  const boundConditionVar = component?.general?.conditionRender;
  const hasEvent = component?.actions && !isEmpty(component?.actions);

  return (
    <FlexExpand className={classNames("NodeTitle", { active })}>
      <span>{title}</span>
      <div>
        {boundConditionVar && (
          <Button className="NodeBtnIF" type="text" size="small">
            IF
          </Button>
        )}
        {hasEvent && (
          <Button className="NodeBtnEVT" type="text" size="small">
            EV
          </Button>
        )}
        {/* <Tooltip title={active ? "隐藏" : "显示"} mouseEnterDelay={0.5}> */}
        <Button
          className="NodeVisibleBtn"
          type="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            if (active) {
              dispatch(hideComponent({ componentId }));
              toast(`隐藏组件 #${componentId}`);
            } else {
              dispatch(showComponent({ componentId }));
              toast.success(`显示组件 #${componentId}`);
            }
          }}
        >
          {active ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </Button>
        {/* </Tooltip> */}
      </div>
    </FlexExpand>
  );
};

const ComponentTree = () => {
  const dispatch = useAppDispatch();
  const components = useAppSelector((s) => s.editor.present.components);

  const treeData = useMemo(() => {
    const travelTree = (components: CanvasComponent[]): DataNode[] => {
      return components.map((node) => {
        return {
          title: (
            <NodeTitle
              title={node.zhName}
              active={node.visible}
              componentId={node.id}
            />
          ),
          key: node.id,
          // children: node.props.children
          //   ? travelTree(node.props.children as any)
          //   : undefined,
        };
      });
    };
    return travelTree(components);
  }, [components]);

  const selectHandler = (selectedKeys: Key[]) => {
    dispatch(setCursorComponentId(selectedKeys[0] as string));
  };
  const cursorComponentId = useAppSelector(selectCursorComponentId);

  return (
    <div className="ComponentTree">
      <div className="ComponentTreeContent">
        {treeData.length ? (
          <Tree
            defaultExpandAll
            selectedKeys={[cursorComponentId as Key]}
            blockNode
            showLine={{ showLeafIcon: false }}
            onSelect={selectHandler}
            treeData={[
              {
                key: "root",
                title: "画布",
                children: treeData,
              },
            ]}
          />
        ) : (
          <Empty description="没有内容" />
        )}
      </div>
    </div>
  );
};

export default ComponentTree;
