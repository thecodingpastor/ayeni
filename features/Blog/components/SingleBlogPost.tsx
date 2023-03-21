import Link from "next/link";
import Image from "next/image";

import { SingleBlogType } from "../types";

import subString from "../../../utils/subString";

import classes from "./SingleBlogPost.module.scss";
import { __date } from "../../../utils/formatDate";

const SingleBlogPost: React.FC<SingleBlogType> = ({
  createdAt,
  title,
  slug,
  images,
  intro,
  estimatedReadTime,
}) => {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className={classes.Container}>
        <div className={classes.ImageContainer}>
          <Image
            className="image-container"
            src={images[0].secure_url}
            fill
            priority
            sizes="25%"
            alt={title}
          />
        </div>
        {/* <Image
          src={image?.secure_url ? image.secure_url : "/images/question.jpg"}
          alt={title}
          fill
          blurDataURL={PlaceholderURL}
          placeholder="blur"
        /> */}
        <div className={classes.Details}>
          <div className={classes.Heading}>
            <h3
              style={{ lineHeight: "1.2", marginBottom: "1rem" }}
              className="ellipses"
            >
              {title}
            </h3>
            <div>
              <span>{__date(createdAt)}</span>
              <span className={classes.Read}>
                {estimatedReadTime} mins read
              </span>
            </div>
          </div>

          <div className={classes.Description}>{subString(intro)}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleBlogPost;
