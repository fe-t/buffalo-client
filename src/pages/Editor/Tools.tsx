import { Button, Icon, Spacer, Tooltip } from "@yy/tofu-ui-react";
import { MdRedo, MdUndo } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../store";
import { ActionCreators } from "redux-undo";

const Tools = () => {
  const dispatch = useAppDispatch();
  const past = useAppSelector((state) => state.editor.past);
  const future = useAppSelector((state) => state.editor.future);

  return (
    <section className="Tools">
      <Tooltip text="撤销">
        <Button
          disabled={past.length <= 0}
          onClick={() => dispatch(ActionCreators.undo())}
        >
          <MdUndo />
        </Button>
      </Tooltip>
      <Spacer x={0.5} inline />
      <Tooltip text="重做">
        <Button
          disabled={future.length <= 0}
          onClick={() => dispatch(ActionCreators.redo())}
        >
          <MdRedo />
        </Button>
      </Tooltip>
      <Spacer x={0.5} inline />
      <Button>
        <Icon type="View" size="small" />
        <span>预览</span>
      </Button>
      <Spacer x={0.5} inline />
      <Button>
        <span>保存</span>
      </Button>
    </section>
  );
};

export default Tools;
