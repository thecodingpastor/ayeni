import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

import { AddAlertMessage } from "../../UI/UISlice";
import { SelectAuth } from "../../auth/authSlice";
import { SelectProject, SetDraftProject } from "../projectSlice";
import { SingleImageType } from "../type";
import { CreateProject, UpdateProject } from "../projectApi";
import { ProjectFormInputsArray } from "./ProjectFormInputs";

import Tiptap from "../../../components/editor/TipTapEditor";
import Button from "../../../components/form/Button";
import FormInput from "../../../components/form/FormInput";
import Transition from "../../../components/general/Transition";
import ImageUpload from "../../../components/editor/ImageUpload";
import Spin from "../../../components/loaders/Spin";
import TaggedInput from "../../../components/form/TaggedInput/TaggedInput";

import classes from "./ProjectForm.module.scss";

const CourseForm: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
  let isMounted = false;
  const [DataIsSaved, setDataIsSaved] = useState(false);

  useEffect(() => {
    // Clear the LS and  draft course store
    if (DataIsSaved) {
      localStorage.removeItem("draft_project");
      dispatch(SetDraftProject(null));
    }
    return () => {
      if (isMounted) {
        // Update draft course in store when user leaves page
        if (!DataIsSaved) {
          dispatch(
            SetDraftProject(JSON.parse(localStorage.getItem("draft_project")))
          );
        }
      }

      isMounted = true;
    };
  }, [DataIsSaved]);

  const dispatch = useAppDispatch();
  const { draftProject, currentProject, projectLoading } =
    useAppSelector(SelectProject);
  const { accessToken } = useAppSelector(SelectAuth);
  const { push } = useRouter();

  const init = !isEdit
    ? {
        title: draftProject?.title || "",
        domainName: draftProject?.domainName || "",
        frontEndGithubURL: draftProject?.frontEndGithubURL || "",
        backEndGithubURL: draftProject?.backEndGithubURL || "",
        videoURL: draftProject?.videoURL || "",
        description: draftProject?.description || "",
        tags: draftProject?.tags || [],
      }
    : {
        title: currentProject?.title || "",
        domainName: currentProject?.domainName || "",
        frontEndGithubURL: currentProject?.frontEndGithubURL || "",
        backEndGithubURL: currentProject?.backEndGithubURL || "",
        videoURL: currentProject?.videoURL || "",
        description: currentProject?.description || "",
        tags: currentProject?.tags || [],
      };

  const [MainContent, setMainContent] = useState<string>(
    !isEdit ? draftProject?.mainContent || "" : currentProject?.mainContent
  );
  const [ProjectFormValues, setProjectFormValues] = useState(init);

  const [Images, setImages] = useState<SingleImageType[]>(
    !isEdit ? draftProject?.images || [] : currentProject?.images || []
  );

  const [TagsArray, setTagsArray] = useState<string[]>(
    !isEdit ? draftProject?.tags || [] : currentProject?.tags || []
  );

  const {
    title,
    backEndGithubURL,
    frontEndGithubURL,
    description,
    domainName,
    videoURL,
  } = ProjectFormValues;

  const urlValidation =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

  const CourseIsValid =
    /^.{5,100}$/.test(title) &&
    /^.{10,}$/.test(MainContent) &&
    urlValidation.test(frontEndGithubURL) &&
    urlValidation.test(domainName) &&
    urlValidation.test(frontEndGithubURL) &&
    (backEndGithubURL?.trim().length > 0
      ? urlValidation.test(backEndGithubURL)
      : true) &&
    urlValidation.test(videoURL) &&
    /^.{10,}$/.test(description);

  // I only implemented this to create course, not to edit it
  const [Value, setValue] = useLocalStorage(
    "draft_project",
    {
      ...ProjectFormValues,
      mainContent: MainContent,
      images: Images,
      tags: TagsArray,
    },
    !isEdit
  );

  const submit = () => {
    // if (!Images?.size && !Images?.secure_url)
    //   return dispatch(
    //     AddAlertMessage({
    //       message: "An image has not been provided.",
    //     })
    //   );

    if (TagsArray.length < 4 || TagsArray.length > 10)
      return dispatch(
        AddAlertMessage({ message: "Can only have 4 - 10 tags" })
      );

    if (!CourseIsValid)
      return dispatch(
        AddAlertMessage({
          message:
            "You did not fill in the right data. Please look closely at the placeholder texts and error messages",
        })
      );

    if (MainContent.trim().length < 40) {
      return dispatch(
        AddAlertMessage({
          message: "Main content too small. Type more content in the editor",
        })
      );
    }

    const handleReset = (data: any) => {
      if (data.meta.requestStatus === "fulfilled") {
        setDataIsSaved(true);
        push("/projects");
        setMainContent("");
        setProjectFormValues(init);
      }
    };

    if (!isEdit) {
      return dispatch(
        CreateProject({
          title,
          domainName,
          frontEndGithubURL,
          backEndGithubURL,
          videoURL,
          description,
          tags: TagsArray,
          mainContent: MainContent,
          images: Images,
        })
      ).then((data) => {
        handleReset(data);
      });
    } else {
      dispatch(
        UpdateProject({
          slug: currentProject?.slug,
          title,
          domainName,
          frontEndGithubURL,
          backEndGithubURL,
          videoURL,
          description,
          mainContent: MainContent,
          images: Images,
          tags: TagsArray,
        })
      ).then((data) => {
        handleReset(data);
      });
    }
  };

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <h1>{!isEdit ? "Create" : "Edit"} Project</h1>
      <ImageUpload
        Images={Images}
        setImages={setImages}
        setValue={setValue}
        title="Select (Up to 4) Images"
        isEdit={isEdit}
        isMultiple
      />
      <TaggedInput
        TagsArray={TagsArray}
        setTagsArray={setTagsArray}
        setValue={setValue}
      />
      <form encType="multipart/form-data">
        {ProjectFormInputsArray.map((input) => {
          return (
            <FormInput
              key={input.name}
              value={ProjectFormValues[input.name]}
              focused="false"
              border
              {...input}
              onChange={(e: any) => {
                setProjectFormValues({
                  ...ProjectFormValues,
                  [e.target.name]: e.target.value,
                });
                setValue(() => {
                  if (typeof Value === "object") {
                    return {
                      ...Value,
                      [e.target.name]: e.target.value,
                    };
                  }
                });
              }}
            />
          );
        })}
        <Tiptap
          setState={setMainContent}
          MainContent={MainContent}
          setValue={setValue}
        />

        <div className="text-center">
          {projectLoading == "default" ? (
            <Spin />
          ) : (
            <Button
              text={isEdit ? "Update" : "Create"}
              type="button"
              mode="pry"
              disabled={!CourseIsValid}
              onClick={!CourseIsValid ? () => {} : submit}
            />
          )}
        </div>
      </form>
    </Transition>
  );
};

export default CourseForm;
