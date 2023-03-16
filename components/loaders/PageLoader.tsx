import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import LoadingLogo from "../general/LoadingLogo";

import classes from "./PageLoader.module.scss";

interface IProps {
  Loading: boolean;
  IsVisible: boolean;
}

const PageLoader: React.FC<IProps> = ({ Loading, IsVisible }) => {
  const [IsBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  if (IsBrowser) {
    return Loading
      ? ReactDOM.createPortal(
          <div className={classes.Container}>
            <div
              className={`${classes.One} ${!IsVisible ? classes.Animate : ""}`}
            ></div>
            <div
              className={`${classes.Two} ${!IsVisible ? classes.Animate : ""}`}
            ></div>
            <LoadingLogo />
          </div>,
          document.getElementById("PageLoader") as HTMLElement
        )
      : null;
  }
  return null;
};

export default PageLoader;
