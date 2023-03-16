import { useState } from "react";

import { Login, Register } from "../auth/authApi";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { LoginFormPropTypes } from "./types";
import { ClearAllProjects } from "../Project/projectSlice";
import { AuthFormInputs, AuthFormInputsArray } from "./AuthFormInputs";

import Button from "../../components/form/Button";
import FormInput from "../../components/form/FormInput";
import Spin from "../../components/loaders/Spin";

const LoginForm: React.FC<LoginFormPropTypes> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const { userLoading } = useAppSelector((state) => state.auth);
  const [AuthFormValues, setAuthFormValues] = useState<any>(AuthFormInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!AuthFormIsValid) return;
    if (mode === "login") {
      dispatch(
        Login({
          username: AuthFormValues.username,
          password: AuthFormValues.password,
        })
      ).then((data) => {
        // The ClearAllProjects reducer is to ensure that the projects are refetched to contain both published and unpublished projects
        if (data.payload) dispatch(ClearAllProjects());
      });
    } else {
      dispatch(
        Register({
          username: AuthFormValues.username,
          password: AuthFormValues.password,
        })
      );
    }
  };

  const AuthFormIsValid =
    /^[A-Za-z0-9\\s]{5,50}$/.test(AuthFormValues.username) &&
    /^.{6,50}$/.test(AuthFormValues.password);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {AuthFormInputsArray.map((input) => (
        <FormInput
          key={input.name}
          value={AuthFormValues[input.name]}
          onChange={(e: any) =>
            setAuthFormValues({
              ...AuthFormValues,
              [e.target.name]: e.target.value,
            })
          }
          {...input}
        />
      ))}
      <div
        className="text-center"
        style={{
          height: "5rem",
          marginBottom: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!userLoading ? (
          <Button
            text={mode === "login" ? "Login" : "Register"}
            type="submit"
            mode="pry"
            disabled={!AuthFormIsValid}
          />
        ) : (
          <Spin white />
        )}
      </div>
    </form>
  );
};

export default LoginForm;
