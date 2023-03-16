import Router from "next/router";
import { useState } from "react";
import { useAppSelector } from "../../fetchConfig/store";
import AuthPageLoading from "../../components/loaders/AuthPageLoading";

import { SelectAuth } from "./authSlice";
import LoginForm from "./LoginForm";

import classes from "./AuthPage.module.scss";

const AuthPage = () => {
  const { accessToken } = useAppSelector(SelectAuth);
  const [Mode, setMode] = useState<"login" | "register">("login");

  const SwitchMode = () => {
    if (Mode === "login") setMode("register");
    else setMode("login");
  };

  if (accessToken) {
    Router.replace("/");
    return <AuthPageLoading />;
  }

  return (
    <div className={classes.Container}>
      <div>
        <h1 onDoubleClick={SwitchMode}>
          {Mode === "login" ? "Login Page" : "Register"}
        </h1>
        <LoginForm mode={Mode} />
      </div>
    </div>
  );
};

export default AuthPage;
