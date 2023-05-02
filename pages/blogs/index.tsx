import Head from "next/head";
import { useEffect } from "react";

import Transition from "../../components/general/Transition";
import AuthPageLoading from "../../components/loaders/AuthPageLoading";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { SelectAuth } from "../../features/auth/authSlice";
import { GetAllBlogs } from "../../features/Blog/BlogApi";
import { SelectBlog } from "../../features/Blog/BlogSlice";

import SingleBlogPost from "../../features/Blog/components/SingleBlogPost";

import classes from "./BlogPage.module.scss";

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector(SelectAuth);
  const { blogLoading, blogs } = useAppSelector(SelectBlog);

  useEffect(() => {
    if (!accessToken && blogs.length === 0) {
      dispatch(GetAllBlogs(""));
    } else if (accessToken && blogs.length === 0) {
      dispatch(GetAllBlogs(user?._id));
    }
  }, [accessToken]);

  if (blogLoading === "default" && blogs.length === 0)
    return <AuthPageLoading />;
  if (blogs.length === 0 && blogLoading === null)
    return (
      <Transition mode="scale-out" className={classes.Container}>
        <h3>There are no blogs yet.</h3>
      </Transition>
    );

  return (
    <Transition mode="scale-out">
      <Head>
        <title>All Blogs | Michael Ayeni</title>
      </Head>
      <div className={classes.Container}>
        {blogs.map((blog) => (
          <SingleBlogPost {...blog} key={blog._id} />
        ))}
      </div>
    </Transition>
  );
};

export default BlogPage;
