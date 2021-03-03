import React from "react";
import { useAppSelector } from "../../store";

const PropsController = () => {
  const cursorComponent = useAppSelector(
    (state) => state.editor.cursorComponent
  );
  return (
    <section className="PropsController">
      {cursorComponent && <p>{cursorComponent.name}</p>}
    </section>
  );
};

export default PropsController;
