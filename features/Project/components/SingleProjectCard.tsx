import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

import subString from "../../../utils/subString";

import classes from "./SingleProjectCard.module.scss";

import { ProjectType } from "../type";
import { FaEllipsisH } from "react-icons/fa";

const Project: React.FC<ProjectType> = ({ slug, title, tags, description }) => {
  const newArray = tags?.slice(0, 5);

  return (
    // had to use this as link was giving errors in the console
    <Link href={`/projects/${slug}`}>
      <article className={classes.Container}>
        <div className={classes.ImageDiv}>
          <div className={classes.Overlay}></div>
          <h3>{title}</h3>
        </div>
        <div className={classes.Tags}>
          {newArray?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}{" "}
          &nbsp;
          <FaEllipsisH style={{ color: "#ffa2f7", marginLeft: "-1rem" }} />
        </div>
        <div className="pointer">
          <div className={classes.Description}>
            {subString(description)}
            <div></div>
          </div>
        </div>
        <footer>
          <span className="pointer">More</span>
        </footer>
      </article>
    </Link>
  );
};

export default Project;
