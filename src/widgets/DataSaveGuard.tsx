import { useContext, useEffect } from "react";
import { DirtyContext } from "../pages/Editor";

export const DataSaveGuard = () => {
  const dirty = useContext(DirtyContext);

  useEffect(() => {
    const unloadHandler = function (e: any) {
      if (dirty) {
        //following two lines will cause the browser to ask the user if they
        //want to leave. The text of this dialog is controlled by the browser.
        e.preventDefault(); //per the standard
        e.returnValue = ""; //required for Chrome
      }
      //else: user is allowed to leave without a warning dialog
    };
    window.addEventListener("beforeunload", unloadHandler);

    return () => {
      window.removeEventListener("beforeunload", unloadHandler);
    };
  }, [dirty]);

  return null;
};
