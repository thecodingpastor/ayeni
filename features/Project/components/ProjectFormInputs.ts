export const urlRegex =
  "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";

export const ProjectFormInputsArray = [
  {
    name: "title",
    label: "Project Title",
    placeholder: "Project Title",
    required: true,
    focused: false,
    pattern: "^.{5,50}$",
    errorText: "Project title should be 5 - 50 characters.",
  },
  {
    name: "frontEndGithubURL",
    label: "Front End Github URL",
    placeholder: "Front End Github URL",
    // required: true,
    focused: false,
    pattern: urlRegex,
    errorText: "Invalid Front End Github URL (e.g. https://github.com/.../...)",
  },
  {
    name: "backEndGithubURL",
    label: "Back End Github URL",
    placeholder: "Back End Github URL",
    pattern: urlRegex,
    // pattern: "^.{0,200}$",
    focused: false,
    errorText: "Invalid Back End Github URL (e.g. https://github.com/.../...)", // Back End Github URL is not required
  },
  {
    name: "videoURL",
    label: "Video URL",
    placeholder: "Video URL",
    // required: true,
    // pattern: urlRegex,
    errorText: "Invalid Video URL (e.g. https://google.com/store/...)",
  },
  {
    name: "domainName",
    label: "Domain Name",
    placeholder: "Domain Name",
    required: true,
    pattern: urlRegex,
    errorText: "Invalid Domain Name (e.g. https://mysite.com)",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    required: true,
    pattern: "^.{20,300}$",
    errorText: "Description should have 20 - 300 characters.",
  },
];
