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

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { alertMessages } = useAppSelector(SelectUI);
  const { accessToken } = useAppSelector(SelectAuth);
  const { currentProject, draftProject } = useAppSelector(SelectProject);

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
    "/create-project",
    "/projects/[slug]/edit",
  ];
  const draftMode = pathname === "/create-project" && !!draftProject?._id;

  return (
    <PersistLogin>
      <Navigation />
      {alertMessages.length > 0 && (
        <ToastContainer alertMessages={alertMessages} position="top-right" />
      )}
      <main>{props.children}</main>
      {pathname !== "/" && <Footer />}
      <ScrollUpButton />
      {accessToken && allowedRoutesFloatingButtonParams.includes(pathname) && (
        <FloatingButtons
          // @ts-ignore
          itemID={draftMode ? draftProject._id : currentProject?.slug}
          // @ts-ignore
          isPublished={currentProject?.isPublished!}
          isDraft={draftMode}
        />
      )}
    </PersistLogin>
  );
};

export default Layout;
