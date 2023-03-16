import { useState, useEffect } from "react";

import type { NextPage } from "next";
import Image from "next/image";

import { AiFillGithub } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { BsTwitter } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";

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
      <p>Hello there, my name is Mike and I am a</p>
      <h1>
        <div className={classes.ChildTwo}>Web Developer</div>
        <div className={classes.ChildOne}>Fullstack </div>
      </h1>
      <div className={classes.Buttons}>
        <span>Resume</span>
        <span>Call Me</span>
      </div>
      <div className={`${classes.Socials} ${Stop ? classes.Stop : ""}`}>
        <a href="" target="__blank" className={classes.SocialIconsContainer}>
          <AiFillGithub />
        </a>
        <a href="" target="__blank" className={classes.SocialIconsContainer}>
          <BsTwitter />
        </a>
        <a href="" target="__blank" className={classes.SocialIconsContainer}>
          <SiGmail />
        </a>
        <a href="" target="__blank" className={classes.SocialIconsContainer}>
          <FaFacebookF />
        </a>
        <a href="" target="__blank" className={classes.SocialIconsContainer}>
          <GrLinkedinOption />
        </a>
      </div>
      <div className={classes.MikeImage}>
        {Stop && (
          <div className={classes.NextImageContainer}>
            <Transition delay={1000} mode="fade">
              <Image
                src={MikeImage}
                width="400"
                height="400"
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
