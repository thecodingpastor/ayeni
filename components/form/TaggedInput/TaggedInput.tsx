import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../../features/UI/UISlice";

import classes from "./TaggedInput.module.scss";

interface IProps {
  TagsArray: string[];
  setTagsArray: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: React.Dispatch<any>;
}
const TaggedInput: React.FC<IProps> = ({
  TagsArray,
  setTagsArray,
  setValue,
}) => {
  const dispatch = useAppDispatch();

  const [CurrentTag, setCurrentTag] = useState("");
  const [TagToRemove, setTagToRemove] = useState("");

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ",") {
      if (CurrentTag.trim() === ",") return setCurrentTag("");
      if (TagsArray?.length >= 10) {
        setCurrentTag("");
        return dispatch(
          AddAlertMessage({
            message: `You can only have 10 tags.`,
          })
        );
      }

      let tag = CurrentTag.trim().slice(0, -1).toLowerCase();
      if (CurrentTag.trim().length > 1) {
        if (TagsArray?.indexOf(tag) > -1) {
          setCurrentTag("");
          return dispatch(
            AddAlertMessage({
              message: `"${tag}" already included in the tags`,
            })
          );
        }
        setTagsArray((prev) => [...prev, tag]);
        setValue((prev: any) => {
          return { ...prev, tags: [...prev.tags, tag] };
        });
        setCurrentTag("");
      }
    }
  };

  const RemoveTag = (tagToRemove: string) => {
    setTagsArray((prev) => {
      if (prev.length) {
        const updated = prev.filter((tag) => tag !== tagToRemove);

        return updated;
      } else {
        return prev;
      }
    });

    setValue((prev: any) => {
      const tags: string[] = prev.tags;
      const updated = tags.filter((tag) => tag !== tagToRemove);
      return { ...prev, tags: updated };
    });
  };

  // I had to do this since useCallback was stressin gme out
  useEffect(() => {
    if (TagToRemove) {
      RemoveTag(TagToRemove);
      setTagToRemove("");
    }
  }, [TagToRemove]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  return (
    <div className={classes.Container}>
      {TagsArray?.map((tag, index) => (
        <div key={index} className={classes.Tag}>
          {tag}{" "}
          <span className={classes.Times} onClick={() => setTagToRemove(tag)}>
            &times;
          </span>
        </div>
      ))}
      <div className={classes.InputContainer}>
        <input
          type="text"
          placeholder="Press 'comma' to save a tag"
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={(e) => handleChange(e)}
          value={CurrentTag}
        />
        <label htmlFor="tags" className={classes.Label}>
          Press 'comma' to save a tag
        </label>
      </div>
    </div>
  );
};

export default TaggedInput;
