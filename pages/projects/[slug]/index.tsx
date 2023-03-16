import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import parser from "html-react-parser";

import axios from "../../../fetchConfig/api/axios";

import { ProjectType } from "../../../features/Project/type";

import Transition from "../../../components/general/Transition";
import Modal from "../../../components/modal/Modal";
import Swiper from "../../../components/swiper/Swiper";
import Video from "../../../features/Project/components/Video";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import {
  SelectProject,
  SetCurrentProject,
} from "../../../features/Project/projectSlice";
import { AddAlertMessage } from "../../../features/UI/UISlice";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";

import classes from "./SingleProject.module.scss";

const index: React.FC<ProjectType> = (props) => {
  const router = useRouter();

  const { currentProject } = useAppSelector(SelectProject);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props._id) {
      dispatch(SetCurrentProject(props));
    } else {
      dispatch(
        AddAlertMessage({
          message: "That project could not be found.",
        })
      );
      router.replace("/projects");
    }
  }, []);

  const [ModalMode, setModalMode] = useState<"video" | "images" | null>(null);

  // if (currentProject === "loading" || !currentProject)
  //   return <AuthPageLoading />;

  return (
    <Transition mode="slide-right">
      <Head>
        <title>{currentProject?.title || "Michael Ayeni's Project"}</title>
      </Head>
      <Modal isOpen={ModalMode === "images"} close={() => setModalMode(null)}>
        <Swiper
          images={currentProject?.images?.length ? currentProject?.images : []}
        />
      </Modal>

      <Modal isOpen={ModalMode === "video"} close={() => setModalMode(null)}>
        <Video src={currentProject?.videoURL!} />
      </Modal>
      <div className={classes.Container}>
        <h1>{currentProject?.title}</h1>
        <div className={classes.Externals}>
          <span onClick={() => setModalMode("video")}>Preview Video</span>
          <span onClick={() => setModalMode("images")}>Snapshots</span>

          {currentProject?.frontEndGithubURL && (
            <a href={currentProject?.frontEndGithubURL} target="_blank">
              Front-end Code
            </a>
          )}
          {currentProject?.backEndGithubURL && (
            <a href={currentProject?.backEndGithubURL} target="_blank">
              Back-end Code
            </a>
          )}
          <a href={currentProject?.domainName} target="_blank">
            View Live Site
          </a>
        </div>

        <p>{currentProject?.description}</p>
        <div className={classes.TechStack}>
          <h3 className="up-down-lines">Tech Stack</h3>
          <div className={classes.Tags}>
            {currentProject?.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <section className={classes.MainContent}>
          <h3 className="up-down-lines ">My Thought Process</h3>
          <div>{parser(currentProject?.mainContent || "")}</div>
        </section>
      </div>
    </Transition>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://irep-livid.vercel.app/api/projects/" + context.params?.slug
      : "http://localhost:3000/api/projects/" + context.params?.slug
  );
  const data = await res.json();

  // for one strange reason, axios stopped working
  // const { data } = await axios.get("/course/" + context.params?.slug);

  if (!data) {
    return {
      props: { notFound: true },
    };
  }

  return {
    props: data,
  };
};

export default index;
