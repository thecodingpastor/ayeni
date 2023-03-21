import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";

// import { AddAlertMessage } from "../../UI/UISlice";
// import { SelectAuth } from "../../auth/authSlice";
import { SetDraftBlog } from "../BlogSlice";
// import { SingleImageType } from "../type";
// import { CreateProject, UpdateProject } from "../projectApi";
import { BlogFormInputsArray } from "../BlogFormInputs";

// import Tiptap from "../../../components/editor/TipTapEditor";
// import Button from "../../../components/form/Button";
// import FormInput from "../../../components/form/FormInput";
// import Transition from "../../../components/general/Transition";
// import ImageUpload from "../../../components/editor/ImageUpload";
// import Spin from "../../../components/loaders/Spin";
// import TaggedInput from "../../../components/form/TaggedInput/TaggedInput";

import classes from "./CreateBlog.module.scss";
import Transition from "../../../components/general/Transition";
import ImageUpload from "../../../components/editor/ImageUpload";
import TaggedInput from "../../../components/form/TaggedInput/TaggedInput";
import FormInput from "../../../components/form/FormInput";
import Tiptap from "../../../components/editor/TipTapEditor";
import Spin from "../../../components/loaders/Spin";
import Button from "../../../components/form/Button";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectAuth } from "../../auth/authSlice";
import { SelectBlog } from "../BlogSlice";
import { AddAlertMessage } from "../../UI/UISlice";
import { CreateBlog, UpdateBlog } from "../BlogApi";
import useAxiosProtected from "../../../hooks/useAxiosProtected";

const BlogForm: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
  let isMounted = false;
  useAxiosProtected();
  const [DataIsSaved, setDataIsSaved] = useState(false);

  useEffect(() => {
    // Clear the LS and  draft course store
    if (DataIsSaved) {
      localStorage.removeItem("draft_blog");
      dispatch(SetDraftBlog(null));
    }
    return () => {
      if (isMounted) {
        // Update draft course in store when user leaves page
        if (!DataIsSaved) {
          dispatch(
            SetDraftBlog(JSON.parse(localStorage.getItem("draft_blog")))
          );
        }
      }

      isMounted = true;
    };
  }, [DataIsSaved]);

  const dispatch = useAppDispatch();
  const { draftBlog, currentBlog, blogLoading } = useAppSelector(SelectBlog);
  const { replace } = useRouter();

  const init = !isEdit
    ? {
        title: draftBlog?.title || "",
        estimatedReadTime: draftBlog?.estimatedReadTime || "",
        intro: draftBlog?.intro || "",
        mainContent: draftBlog?.mainContent || "",
        tags: draftBlog?.tags || [],
      }
    : {
        title: currentBlog?.title || "",
        estimatedReadTime: currentBlog?.estimatedReadTime || "",
        intro: currentBlog?.intro || "",
        mainContent: currentBlog?.mainContent || "",
        tags: currentBlog?.tags || [],
      };

  const [MainContent, setMainContent] = useState<string>(
    !isEdit ? draftBlog?.mainContent || "" : currentBlog?.mainContent
  );
  const [BlogFormValues, setBlogFormValues] = useState(init);

  const [Images, setImages] = useState<any[]>(
    !isEdit ? draftBlog?.images || [] : currentBlog?.images || []
  );

  const [TagsArray, setTagsArray] = useState<string[]>(
    !isEdit ? draftBlog?.tags || [] : currentBlog?.tags || []
  );

  const { title, estimatedReadTime, intro } = BlogFormValues;

  const BlogIsValid =
    /^.{5,100}$/.test(title) &&
    /^.{10,}$/.test(MainContent) &&
    /^.{10,}$/.test(intro);

  // I only implemented this to create course, not to edit it
  const [Value, setValue] = useLocalStorage(
    "draft_blog",
    {
      ...BlogFormValues,
      mainContent: MainContent,
      images: Images,
      tags: TagsArray,
    },
    !isEdit
  );

  const submit = () => {
    if (Images?.length < 1) {
      return dispatch(
        AddAlertMessage({
          message: "Blog requires at least one image.",
        })
      );
    }

    if (!BlogIsValid)
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
        replace("/blogs");
        setMainContent("");
        setBlogFormValues(init);
      }
    };
    if (!isEdit) {
      return dispatch(
        CreateBlog({
          title,
          intro,
          estimatedReadTime,
          tags: TagsArray,
          mainContent: MainContent,
          images: Images,
        })
      ).then((data) => {
        handleReset(data);
      });
    } else {
      dispatch(
        UpdateBlog({
          title,
          intro,
          estimatedReadTime,
          slug: currentBlog?.slug,
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
      <ImageUpload
        Images={Images}
        setImages={setImages}
        setValue={setValue}
        title="Select Images"
        isEdit={isEdit}
        isMultiple
      />
      <TaggedInput
        TagsArray={TagsArray}
        setTagsArray={setTagsArray}
        setValue={setValue}
      />
      <form encType="multipart/form-data">
        {BlogFormInputsArray.map((input) => {
          return (
            <FormInput
              key={input.name}
              value={BlogFormValues[input.name]}
              focused="false"
              border
              {...input}
              onChange={(e: any) => {
                setBlogFormValues({
                  ...BlogFormValues,
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
          {blogLoading == "default" ? (
            <Spin />
          ) : (
            <Button
              text={isEdit ? "Update Blog" : "Create Blog"}
              type="button"
              mode="pry"
              disabled={!BlogIsValid}
              onClick={!BlogIsValid ? () => {} : submit}
            />
          )}
        </div>
      </form>
    </Transition>
  );
};

export default BlogForm;
