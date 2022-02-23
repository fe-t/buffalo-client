import React, {
  ElementType,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const CollapseGroup: FC<PropsWithChildren<{}>> = ({ children, ...props }) => {
  return (
    <div className="CollapseGroup" {...props}>
      {children}
    </div>
  );
};

const Collpase: FC<
  PropsWithChildren<{ title: ReactNode; defaultOpen?: boolean }>
> & {
  Group: ElementType;
} = ({ title, defaultOpen, children }) => {
  const [open, setOpen] = useState(!!defaultOpen);

  const toggle = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  return (
    <div className="Collapse">
      <div className="CollapseHeader" onClick={toggle}>
        <span>{title}</span>
        {open ? (
          <MdKeyboardArrowDown size="20" />
        ) : (
          <MdKeyboardArrowRight size="20" />
        )}
      </div>
      {open && <div className="CollapseContent">{children}</div>}
    </div>
  );
};

Collpase.Group = CollapseGroup;

export default Collpase;
