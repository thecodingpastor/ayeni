import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectBlog } from "../../../features/Blog/BlogSlice";
import { AddAlertMessage } from "../../../features/UI/UISlice";

import BlogForm from "../../../features/Blog/components/CreateBlogForm";

import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import { GetSingleBlogFromBackend } from "../../../features/Blog/BlogApi";
import axios from "../../../fetchConfig/api/axios";

import classes from "./EditBlog.module.scss";

const EditProject = () => {
  const { pathname, query, replace } = useRouter();

  const dispatch = useAppDispatch();
  const { currentBlog } = useAppSelector(SelectBlog);

  useEffect(() => {
    // This works when the edit page is reloaded
    if (pathname === "/blogs/[slug]/edit") {
      dispatch(GetSingleBlogFromBackend(query?.slug as string));
    }
  }, []);

  // if (currentProject === "loading") return <AuthPageLoading />;

  if (!currentBlog?._id) {
    replace("/blogs");
    dispatch(AddAlertMessage({ message: "Blog not found" }));
    return;
  }

  return (
    <div className={classes.Container}>
      <BlogForm {...currentBlog} isEdit />
    </div>
  );
};

export default EditProject;
