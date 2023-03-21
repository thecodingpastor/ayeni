export const urlRegex =
  "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

export const BlogFormInputsArray = [
  {
    name: "title",
    label: "Blog Title",
    placeholder: "Blog Title",
    required: true,
    focused: false,
    pattern: "^.{5,100}$",
    errorText: "Blog title should be 5 - 100 characters.",
  },
  {
    name: "estimatedReadTime",
    label: "Estimated Read Time",
    placeholder: "Estimated Read Time",
    required: true,
    focused: false,
    type: "number",
    // pattern: "[1-5]$",
    errorText: "Invalid estimated read time",
  },
  {
    name: "intro",
    label: "Introduction",
    placeholder: "Introduction",
    required: true,
    pattern: "^.{10,200}$",
    errorText: "Intro should be 10 - 200 characters",
  },
];
