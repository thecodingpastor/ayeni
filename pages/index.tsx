import { useState, useEffect } from "react";

import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import { AiFillGithub } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { BsTwitter, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

import Transition from "../components/general/Transition";
import MikeImage from "../assets/images/img.png";

import classes from "./Index.module.scss";

const Home: NextPage = () => {
  const [Stop, setStop] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setStop(true), 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>Michael Ayeni | Home</title>
      </Head>
      <p>Hello there, my name is Mike and I am a</p>
      <h1>
        <div className={classes.ChildTwo}>Web Developer</div>
        <div className={classes.ChildOne}>Fullstack </div>
      </h1>
      <div className={classes.Buttons}>
        <a href="resume.pdf" target="__blank" rel="noreferrer">
          Resume
        </a>
        <a href="mailto: thecodingpastor@gmail.com" target="__blank">
          Contact
        </a>
      </div>
      <div className={`${classes.Socials} ${Stop ? classes.Stop : ""}`}>
        <a
          href="https://github.com/thecodingpastor"
          target="__blank"
          className={classes.SocialIconsContainer}
        >
          <AiFillGithub />
        </a>
        <a
          href="https://twitter.com/thecodingpastor"
          target="__blank"
          className={classes.SocialIconsContainer}
        >
          <BsTwitter />
        </a>
        <a
          href="mailto: thecodingpastor@gmail.com"
          className={classes.SocialIconsContainer}
        >
          <SiGmail />
        </a>
        {/* <a
          href="https://www.youtube.com/channel/UCbyIRwis0o_0Wi5P7CvXcfw"
          target="__blank"
          className={classes.SocialIconsContainer}
        >
          <BsYoutube />
        </a> */}
        <a
          href="https://wa.me/+2347033379771"
          target="__blank"
          className={classes.SocialIconsContainer}
        >
          <BsWhatsapp />
        </a>
        <a
          href="https://linkedin.com/in/michael-ayeni"
          target="__blank"
          className={classes.SocialIconsContainer}
        >
          <GrLinkedinOption />
        </a>
      </div>
      <div className={classes.MikeImage}>
        {Stop && (
          <div className={classes.NextImageContainer}>
            <Transition delay={1000} mode="fade">
              <Image
                src={MikeImage}
                width="350"
                height="350"
                alt="Michael Ayeni"
              />
            </Transition>
          </div>
        )}
      </div>
    </Transition>
  );
};

export default Home;
