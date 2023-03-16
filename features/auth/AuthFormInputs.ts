export const AuthFormInputs = {
  username: "",
  password: "",
};

export const AuthFormInputsArray = [
  {
    name: "username",
    label: "Username",
    placeholder: "Username",
    required: true,
    pattern: "^[A-Za-z0-9\\s]{5,50}$",
    errorText: "Letters and Numbers Alone, 5-50 characters",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
    type: "password",
    pattern: "^.{5,50}$",
    errorText: "Password should be 6 - 50 characters.",
  },
];
