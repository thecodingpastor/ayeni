import Link from "next/link";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.Container}>
      <p>
        {" "}
        <Link href="https://linkedin.com/in/michael-ayeni" target="__blank">
          {" "}
          Linked In
        </Link>{" "}
        |{" "}
        <Link href="https://twitter.com/thecodingpastor" target="__blank">
          Twitter
        </Link>{" "}
        | <a href="mailto: thecodingpastor@gmail.com">Gmail </a>
      </p>
      <p>&copy; TheCodingPastor {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
