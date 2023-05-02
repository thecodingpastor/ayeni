import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";

import Transition from "../../../components/general/Transition";
import SingleProjectCard from "./SingleProjectCard";

import { SelectProject } from "../projectSlice";

import classes from "./ProjectsPage.module.scss";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import { GetAllProjects } from "../projectApi";
import useAxiosProtected from "../../../hooks/useAxiosProtected";
import { SelectAuth } from "../../auth/authSlice";
import Head from "next/head";

const ProjectsPage = () => {
  const { user, accessToken } = useAppSelector(SelectAuth);
  const dispatch = useAppDispatch();
  useAxiosProtected();
  const { projectLoading, projects } = useAppSelector(SelectProject);

  useEffect(() => {
    if (!accessToken && projects.length === 0) {
      dispatch(GetAllProjects(""));
    } else if (accessToken && projects.length === 0) {
      dispatch(GetAllProjects(user?._id));
    }
  }, [accessToken]);

  if (projectLoading === "default" && projects.length === 0)
    return <AuthPageLoading />;
  if (projects.length === 0 && projectLoading === null)
    return (
      <Transition mode="scale-out" className={classes.Container}>
        <h3 className="text-center">There is no project yet</h3>
      </Transition>
    );

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>All Projects | Michael Ayeni</title>
      </Head>
      <p>
        As a self-taught Fullstack Developer, I believe the best way to show my
        abilities is to build applications of different range and sizes. Here
        are some of the projects that I have built in the past few months.{" "}
      </p>

      <section className={classes.Projects}>
        {projects.map((project) => {
          return <SingleProjectCard key={project?._id} {...project} />;
        })}
      </section>
    </Transition>
  );
};

export default ProjectsPage;
