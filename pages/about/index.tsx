import Head from "next/head";

import Transition from "../../components/general/Transition";

import classes from "./About.module.scss";

const index = () => {
  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>About Michael Ayeni</title>
      </Head>
      <h1 className="text-center">Meet Michael Ayeni</h1>
      <section>
        <p>
          Hello everyone, my name is Michael Ayeni and I am a Christian. I was
          born, raised and I currently live in Lagos, Nigeria, with my beautiful
          wife Anu and our two daughters, Tobiloba and Michelle. I am passionate
          about learning and building applications relating to JavaScript
          fullstack web development.
        </p>
        <p>
          I started programming about six years ago as a self-taught developer.
          I am always fascinated about how computer applications work, so my
          journey into web development began out of curiosity. I started out
          with Vanilla PHP for about 18 months, building a few applications
          along the way, before I switched to the world of JavaScript.
        </p>
        <p>
          Ever since I made the switch, web development has been more enjoyable
          for me. I currently work with technologies like{" "}
          <a href="https://nodejs.org/en" target="_blank">
            NodeJS
          </a>{" "}
          <a href="https://redux-toolkit.js.org/" target="_blank">
            Redux Toolkit
          </a>{" "}
          <a href="https://tanstack.com/query/v3/" target="_blank">
            React Query
          </a>{" "}
          <a href="https://www.typescriptlang.org/" target="_blank">
            TypeScript
          </a>{" "}
          <a href="https://react.dev/" target="_blank">
            ReactJS
          </a>{" "}
          <a href="https://nextjs.org/" target="_blank">
            NextJS
          </a>{" "}
          <a href="https://www.mongodb.com/" target="_blank">
            MongoDB
          </a>{" "}
          <a href="https://expressjs.com/" target="_blank">
            Express JS
          </a>{" "}
          <a href="https://www.mysql.com/" target="_blank">
            MySQL
          </a>{" "}
          <a href="https://www.mongoosejs.com/" target="_blank">
            Mongoose
          </a>{" "}
          <a href="https://sass-lang.com/" target="_blank">
            SCSS
          </a>{" "}
          <a href="https://www.emailjs.com" target="_blank">
            emailjs
          </a>{" "}
          and a few others in the JavaScript eco-system. I host my applications
          on{" "}
          <a href="https://vercel.com/" target="_blank">
            Vercel
          </a>{" "}
          <a href="https://www.netlify.com/" target="_blank">
            Netlify
          </a>{" "}
          and{" "}
          <a href="https://www.digitalocean.com/" target="_blank">
            Digital Ocean
          </a>
          . I am currently venturing into{" "}
          <a href="https://www.aws.amazon.com/" target="_blank">
            AWS
          </a>{" "}
          <a href="https://www.docker.com/" target="_blank">
            Docker
          </a>{" "}
          <a href="https://www.kubernetes.io/" target="_blank">
            Kubernetes
          </a>{" "}
          and{" "}
          <a href="https://www.reactnative.dev/" target="_blank">
            React Native
          </a>
        </p>{" "}
        <p>
          At the moment, I work as a freelance full stack web developer, and I
          am hoping to get a remote or on-site web development role in one of
          the TECH giant companies someday. My resume is available on LinkedIn.
          Follow me on Twitter at{" "}
          <a href="https://twitter.com/thecodingpastor" target="_blank">
            @thecodingpastor
          </a>
          . Check out my work on{" "}
          <a href="https://github.com/thecodingpastor" target="_blank">
            Github
          </a>
          . I intend to start a{" "}
          <a
            href="https://www.youtube.com/channel/UCbyIRwis0o_0Wi5P7CvXcfw"
            target="_blank"
          >
            YouTube channel
          </a>{" "}
          soon to help others who are seeking to learn web development. You can
          reach me majorly via my e-mail{" "}
          <a href="mailto: thecodingpastor@gmail.com" target="_blank">
            thecodingpastor@gmail.com
          </a>
        </p>
      </section>
    </Transition>
  );
};

export default index;
