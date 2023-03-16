import Transition from "../../components/general/Transition";

import data from "./data";

import classes from "./BlogPage.module.scss";
import SingleBlogPost from "./SingleBlogPost";

const BlogPage = () => {
  return (
    <Transition mode="scale-out">
      <div className={classes.Container}>
        {data.map((blog) => (
          <SingleBlogPost {...blog} key={blog.id} />
        ))}
      </div>
    </Transition>
  );
};

export default BlogPage;
