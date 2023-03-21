import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import classes from "./Logo.module.scss";

const Logo = () => {
  const navigate = useRouter();
  const [Show, setShow] = useState(false);

  let timer;
  useEffect(() => {
    timer = setTimeout(() => setShow(true), 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Link
      href="/"
      className={`${classes.Container} ${Show ? classes.Show : ""}`}
      onDoubleClick={() => navigate.push("/auth")}
    >
      <figure>
        <Image src="/head.png" fill alt="Michael Ayeni" className="round" />
      </figure>
    </Link>
  );
};

export default Logo;
