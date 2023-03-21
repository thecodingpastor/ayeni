import Parser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Transition from "../../../components/general/Transition";
import { SelectBlog, SetCurrentBlog } from "../../../features/Blog/BlogSlice";
import { SingleBlogType } from "../../../features/Blog/types";
import { AddAlertMessage } from "../../../features/UI/UISlice";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";

import PlaceholderImage from "../../../assets/images/head.png";

import classes from "./Slug.module.scss";

const SingleBlogPage = (props: SingleBlogType) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentBlog } = useAppSelector(SelectBlog);

  useEffect(() => {
    if (props._id) {
      dispatch(SetCurrentBlog(props));
    } else {
      dispatch(
        AddAlertMessage({
          message: "That blog could not be found.",
        })
      );
      router.replace("/blogs");
    }
  }, []);

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>{currentBlog?.title || "Michael Ayeni's Blog"}</title>
      </Head>

      <h1>{currentBlog?.title}</h1>
      <div className={classes.ImageContainer}>
        <Image
          src={currentBlog?.images[0].secure_url || PlaceholderImage}
          alt={currentBlog?.title || ""}
          fill
          blurDataURL="/public/images/small-h.png"
          placeholder="blur"
          className={classes.Img}
        />
      </div>
      <section>
        <div className={classes.Intro}>{currentBlog?.intro}</div>
        <div className={classes.Content}>
          {Parser(currentBlog?.mainContent || "")}
        </div>
      </section>
    </Transition>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://irep-livid.vercel.app/api/blogs/" + context.params?.slug
      : "http://localhost:3000/api/blogs/" + context.params?.slug
  );
  const data = await res.json();

  if (!data) {
    return {
      props: { notFound: true },
    };
  }

  return {
    props: data,
  };
};

export default SingleBlogPage;
