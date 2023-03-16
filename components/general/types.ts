export type ImageAreaProps = {
  UploadedFiles: any[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<any[]>>;
  isDraft?: boolean;
};

// An interface for our actions
export interface ContactFormInputsAction {
  type: "INPUT_CHANGE";
  inputId: string;
  value: string;
  isValid: boolean;
}
