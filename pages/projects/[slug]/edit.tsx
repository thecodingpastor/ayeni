import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import {
  SelectProject,
  GetCurrentProject,
} from "../../../features/Project/projectSlice";
import { AddAlertMessage } from "../../../features/UI/UISlice";

import ProjectForm from "../../../features/Project/components/ProjectForm";

import classes from "./EditProject.module.scss";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import { GetSingleProjectFromBackend } from "../../../features/Project/projectApi";
import axios from "../../../fetchConfig/api/axios";

const EditProject = () => {
  const { pathname, query, replace } = useRouter();

  const dispatch = useAppDispatch();
  const { currentProject } = useAppSelector(SelectProject);

  useEffect(() => {
    // This works when the edit page is reloaded
    if (pathname === "/projects/[slug]/edit") {
      dispatch(GetSingleProjectFromBackend(query?.slug as string));
    }
  }, []);

  // if (currentProject === "loading") return <AuthPageLoading />;

  if (!currentProject?._id) {
    replace("/projects");
    dispatch(AddAlertMessage({ message: "Project not found" }));
    return;
  }

  return (
    <div className={classes.Container}>
      <ProjectForm {...currentProject} isEdit />
    </div>
  );
};

export default EditProject;
