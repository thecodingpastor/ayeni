export type FormInputsType = {
  inputs: {
    username: {
      value: string;
      isValid: boolean;
    };
    password: {
      value: string;
      isValid: boolean;
    };
  };
  formIsValid: boolean;
};

export interface User {
  username: string;
  accessToken: string;
  _id?: string;
}

export interface LoginUserParams {
  username: string;
  password: string;
}

export interface InitialAuthStateType {
  user: User | null;
  accessToken: string | null;
  userLoading: boolean;
}

// An interface for our actions
export interface LoginFormInputsAction {
  type: "INPUT_CHANGE";
  inputId: string;
  value: string;
  isValid: boolean;
}

export type LoginFormPropTypes = {
  mode: "login" | "register";
};
