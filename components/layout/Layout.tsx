import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "../../fetchConfig/store";

import ScrollUpButton from "../general/ScrollUpButton";
import PageLoader from "../loaders/PageLoader";
import ToastContainer from "../toast/ToastContainer";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";
import PersistLogin from "./PersistLogin";
import { SelectUI } from "../../features/UI/UISlice";
import { SelectAuth } from "../../features/auth/authSlice";
import FloatingButtons from "../general/FloatingButtons";
import { SelectProject } from "../../features/Project/projectSlice";
import { SelectBlog } from "../../features/Blog/BlogSlice";

import classes from "./Layout.module.scss";

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { alertMessages } = useAppSelector(SelectUI);
  const { accessToken } = useAppSelector(SelectAuth);
  const { currentProject } = useAppSelector(SelectProject);
  const { currentBlog } = useAppSelector(SelectBlog);

  const { pathname } = useRouter();

  const [Loading, setLoading] = useState(true); // This is to display my initial UI
  const [IsVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (Loading) {
    return <PageLoader Loading={Loading} IsVisible={IsVisible} />;
  }

  const allowedRoutesFloatingButtonParams = [
    "/projects/[slug]",
    "/blogs/[slug]",
    "/create-project",
    "/create-blog",
    "/projects/[slug]/edit",
    "/blogs/[slug]/edit",
  ];

  return (
    <PersistLogin>
      <div className={classes.Container}>
        <Navigation />
        {alertMessages.length > 0 && (
          <ToastContainer alertMessages={alertMessages} position="top-right" />
        )}

        <main>{props.children}</main>
        {pathname !== "/" && (
          <div style={{ marginTop: "auto !important" }}>
            <Footer />
          </div>
        )}
      </div>
      <ScrollUpButton />
      {accessToken && allowedRoutesFloatingButtonParams.includes(pathname) && (
        <FloatingButtons
          itemID={
            pathname.startsWith("/projects/[slug]")
              ? currentProject?.slug
              : currentBlog?.slug
          }
          isPublished={
            pathname.startsWith("/projects/[slug]")
              ? currentProject?.isPublished
              : currentBlog?.isPublished
          }
        />
      )}
    </PersistLogin>
  );
};

export default Layout;
