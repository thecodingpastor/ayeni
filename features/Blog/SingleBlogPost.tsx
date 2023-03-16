import React from "react";

import Link from "next/link";
import Image from "next/image";

import { SinglePostTypes } from "./types";

import subString from "../../utils/subString";
import classes from "./SingleBlogPost.module.scss";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

const SingleBlogPost: React.FC<SinglePostTypes> = ({
  id,
  title,
  comments,
  content,
  createdAt,
  slug,
  img,
  likes,
  intro,
  readTime,
}) => {
  const EvaluateComment =
    comments?.length > 1
      ? comments?.length + " comments"
      : comments?.length === 1
      ? comments?.length + " comment"
      : "Be the first to comment";
  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className={classes.Container}>
        <div style={{ width: "100%" }}>
          <Image
            className="image-container"
            src={img}
            width="170"
            height="130"
            // blurDataURL="/public/question.jpg"
            // placeholder="blur"
            layout="responsive"
            alt={title}
          />
        </div>
        <div className={classes.Details}>
          <div className={classes.Heading}>
            <h3
              style={{ lineHeight: "1.2", marginBottom: "1rem" }}
              className="ellipses"
            >
              {title}
            </h3>
            <div>
              <span>12th Jun, 2022 </span>
              {/* <span>{createdAt} </span> */}
              <span className={classes.Read}>{readTime} mins read</span>
            </div>
          </div>

          <div className={classes.Description}>{subString(intro)}</div>
          <footer>
            <div className={classes.LikeCountContainer}>
              {/* {!likes?.includes(localStorage.getItem("akinId")) ? (
              <FaRegThumbsUp />
            ) : (
              <FaThumbsUp />
            )} */}
              <FaThumbsUp />
              {likes?.length > 0 && (
                <span className={classes.count}>{likes.length}</span>
              )}
            </div>
            <div className={classes.CommentCountContainer}>
              {EvaluateComment}
            </div>
          </footer>
        </div>
      </div>
    </Link>
  );
};

export default SingleBlogPost;
