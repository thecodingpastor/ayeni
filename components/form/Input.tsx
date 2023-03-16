// import { useReducer, useEffect, useState, useRef } from "react";
// import { MdCancel } from "react-icons/md";
// import { ImShrink } from "react-icons/im";

// import { InputActionCases, InputProps } from "./type";

// import classes from "./Input.module.scss";
// import InputReducer from "./InputReducer";
// import { BsFillCheckCircleFill } from "react-icons/bs";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Input: React.FC<InputProps> = ({
//   type = "text",
//   name,
//   placeholder,
//   required,
//   id,
//   autoComplete,
//   onInput,
//   validators,
//   style,
//   row = 7,
//   className,
//   label,
//   element,
//   errorText,
//   border,
// }) => {
//   const [InputState, dispatch] = useReducer(InputReducer, {
//     value: "",
//     isValid: false,
//     isPristine: true,
//   });
//   const [ShowPassword, setShowPassword] = useState(false);

//   const { value, isValid, isPristine } = InputState;

//   useEffect(() => onInput(id, value, isValid), [id, value, isValid, onInput]);

//   const changeHandler = (e: any) => {
//     dispatch({
//       type: InputActionCases.CHANGE,
//       val: e.target.value,
//       // Array of Validator functions from an instance of the input component
//       validators: validators,
//     });
//   };

//   const blurHandler = () => {
//     dispatch({ type: InputActionCases.TOUCH });
//   };

//   const textareaRef = useRef<any>();

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current!.style.height = "10rem";
//       const scrollHeight = textareaRef.current?.scrollHeight;
//       textareaRef.current!.style.height = scrollHeight + "px";
//     }
//   }, [value]);

//   const handleScrollClear = () => {
//     if (textareaRef.current) {
//       textareaRef.current!.style.height = "10rem";
//     }
//   };

//   let elementToReturn;
//   if (element === "autotextarea") {
//     elementToReturn = (
//       <>
//         <span onClick={handleScrollClear} className={classes.SpanClear}>
//           <ImShrink />
//         </span>
//         <textarea
//           ref={textareaRef}
//           name={name}
//           id={id || ""}
//           placeholder={placeholder}
//           value={value}
//           rows={row}
//           onBlur={blurHandler}
//           onChange={changeHandler}
//           required={required || false}
//           autoComplete={autoComplete || "off"}
//           className={`${classes.AutoTextArea} ${border ? classes.border : ""}`}
//         />
//       </>
//     );
//   } else if (element === "textarea") {
//     elementToReturn = (
//       <textarea
//         className={`${border ? classes.border : ""} `}
//         name={name}
//         rows={10}
//         id={id || ""}
//         required={required || false}
//         autoComplete={autoComplete || "off"}
//         placeholder={placeholder}
//         onChange={changeHandler}
//         value={value}
//         onBlur={blurHandler}
//       />
//     );
//   } else {
//     elementToReturn = (
//       <input
//         className={`${border ? classes.border : ""} `}
//         type={
//           type === "password" ? (!ShowPassword ? "password" : "text") : type
//         }
//         name={name}
//         id={id || ""}
//         min={type === "number" ? 1 : ""}
//         required={required || false}
//         autoComplete={autoComplete || "off"}
//         placeholder={placeholder}
//         onChange={changeHandler}
//         value={value}
//         onBlur={blurHandler}
//       />
//     );
//   }

//   return (
//     <div
//       className={`${classes.Container} ${className ? className : ""} ${
//         !isValid && !isPristine ? classes.Invalid : ""
//       }`}
//       style={style ? style : {}}
//     >
//       {type === "password" ? (
//         <span
//           className={classes.Eyes}
//           onClick={() => setShowPassword((prev) => !prev)}
//         >
//           {ShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//         </span>
//       ) : (
//         ""
//       )}
//       {elementToReturn}
//       <label htmlFor={id} className={classes.Label}>
//         {label}{" "}
//         {!isPristine ? isValid ? <BsFillCheckCircleFill /> : <MdCancel /> : ""}
//       </label>
//       {!isValid && !isPristine && (
//         <span className={classes.ErrorText}>
//           {errorText} &nbsp; <MdCancel />
//         </span>
//       )}
//     </div>
//   );
// };

// export default Input;

export default "";
