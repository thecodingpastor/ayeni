import Image from "next/image";

import classes from "./MyImage.module.scss";

const MyImage = ({ src, alt, ...others }) => {
  return (
    <div className={classes.Container}>
      <Image src={src} alt={alt} {...others} />
    </div>
  );
};

export default MyImage;
