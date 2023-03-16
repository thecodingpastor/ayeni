import {
  VALIDATOR_IMAGE_URL,
  VALIDATOR_MAX,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
} from "../../components/form/validator";

export const CreateBlogFormInputs = [
  {
    id: "title",
    name: "title",
    placeholder: "Project Title", // Label and placeholders are the same
    validators: [VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(100)],
    errorText: "Title must have 5 - 100 characters",
  },
  {
    id: "description",
    name: "description",
    placeholder: "Description",
    validators: [VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(300)],
    errorText: "Description should be between 10 - 300 characters",
    element: "textarea",
  },
  {
    id: "image",
    name: "image",
    placeholder: "Image URL",
    validators: [VALIDATOR_IMAGE_URL()],
    errorText: "Invalid Image URL",
    type: "url",
  },
  {
    id: "estimatedReadTime",
    name: "estimatedReadTime",
    placeholder: "Estimated Read Time (in mins)",
    validators: [VALIDATOR_MIN(1), VALIDATOR_MAX(20)],
    errorText: "Estimated Read Time should be between 1 - 20",
    type: "number",
  },
];

export const CreateBlogFormInitialState = {
  title: {
    value: "",
    isValid: false,
  },
  description: {
    value: "",
    isValid: false,
  },
  image: {
    value: "",
    isValid: false,
  },
  estimatedReadTime: {
    value: "",
    isValid: false,
  },
};
