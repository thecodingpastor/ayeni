import React from "react";

import classes from "./Footer.module.scss";

const Footer = () => {
  const BubbleArr = [];
  for (let i = 0; i < 128; i++) {
    BubbleArr.push(
      <div className={classes.bubble} key={i}>
        a{" "}
      </div>
    );
  }
  return null;

  return (
    <div className={classes.Container}>
      <div className={classes.bubbles}>{BubbleArr}</div>
    </div>
  );
};

// div.footer
//     div.bubbles
//         - for (var i = 0; i < 128; i++) //Small numbers looks nice too
//             div.bubble(style=`--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`)

export default Footer;
