import React, {
  ComponentType,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

export const withModal = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const history = useHistory();

    const back = useCallback(
      (e: any) => {
        e.stopPropagation();
        history.goBack();
      },
      [history]
    );

    const [modalHeight, setModalHeight] = useState(0);

    const modalEl = useRef<any>();
    useEffect(() => {
      const ob = new ResizeObserver(([theModal]) => {
        setModalHeight(theModal.contentRect.height);
      });
      ob.observe(modalEl.current);
      return () => {
        ob.disconnect();
      };
    }, []);

    useEffect(() => {
      const handleEscPress = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
          back(e);
        }
      };
      document.addEventListener("keyup", handleEscPress, false);
      return () => {
        document.removeEventListener("keyup", handleEscPress);
      };
    }, [back]);

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: "100vh",
          height: modalHeight + 50,
          transition: "height 0.2s",
          background: "rgba(0, 0, 0, 0.15)",
          zIndex: 2,
        }}
      >
        <div
          className="modal"
          ref={modalEl}
          style={{
            position: "absolute",
            background: "#fff",
            top: 25,
            left: "10%",
            right: "10%",
            boxSizing: "border-box",
            minHeight: 300,
            minWidth: 1000,
          }}
        >
          <Component {...props} />
        </div>
      </div>
    );
  };
};
