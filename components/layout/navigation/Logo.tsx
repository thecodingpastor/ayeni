import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Logo.module.scss";

const Logo = () => {
  const navigate = useRouter();

  return (
    <Link
      href="/"
      className={classes.Container}
      onDoubleClick={() => navigate.push("/auth")}
    >
      <figure>
        <Image src="/head.png" fill alt="Michael Ayeni" className="round" />
      </figure>
    </Link>
  );
};

export default Logo;
