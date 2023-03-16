import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";

import { MdCancel } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { ImShrink } from "react-icons/im";

import { FormInputPropsType } from "./type";
import { useAppDispatch } from "../../fetchConfig/store";

import classes from "./Input.module.scss";

const FormInput: React.FC<FormInputPropsType> = ({
  type = "text",
  name,
  placeholder,
  required = false,
  autoComplete = "off",
  pattern = "",
  onChange,
  value,
  row = 7,
  className,
  label,
  element,
  errorText,
  border,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Focused, setFocused] = useState(false);

  const handleBlur = () => {
    if (!Focused) setFocused(true);
  };

  let elementToReturn: React.ReactNode;

  if (element === "textarea") {
    elementToReturn = (
      <textarea
        className={`${border ? classes.border : ""} `}
        id={name}
        name={name}
        rows={row}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        // pattern does not work in textarea
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
        data-focused={Focused.toString()}
      />
    );
  } else {
    elementToReturn = (
      <input
        className={`${border ? classes.border : ""} `}
        type={
          type === "password" ? (!ShowPassword ? "password" : "text") : type
        }
        id={name}
        name={name}
        min={type === "number" ? 1 : ""}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
        data-focused={Focused.toString()}
      />
    );
  }

  return (
    <div className={`${classes.Container} ${className ? className : ""}`}>
      {/* <div
      className={`${classes.Container} ${className ? className : ""} ${
        !isValid && !Focused ? classes.Invalid : ""
      }`}
      style={style ? style : {}}
    > */}
      {type === "password" ? (
        <span
          className={classes.Eyes}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {ShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      ) : (
        ""
      )}
      {elementToReturn}
      <label htmlFor={name} className={classes.Label}>
        {label}
        {/* {!Focused ? isValid ? <BsFillCheckCircleFill /> : <MdCancel /> : ""} */}
      </label>
      {Focused && (
        <span className={classes.ErrorText}>
          {errorText} &nbsp; <MdCancel />
        </span>
      )}
    </div>
  );
};

export default FormInput;
