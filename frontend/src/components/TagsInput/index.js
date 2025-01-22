import React, { useState } from "react";
import classes from "./TagsInput.module.css";
import ErrorText from "../ErrorText";
import { mergeClass } from "../../helper/mergeClass";
const TagsInput = ({ label, value, setter, error, errorText }) => {
  const [tagInput, setTagInput] = useState("");
  return (
    <div className={classes.tagsContainer}>
      {label && <p className={classes.label}>{label}</p>}
      <div
        className={mergeClass(classes.inputTags, error && classes.errorBorder)}
      >
        {value?.map((tag) => (
          <p className={classes.tag}>{tag}</p>
        ))}
        <input
          placeholder="Enter Tags"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e?.key === "Enter" && !value?.includes(tagInput?.trim())) {
              setter([...value, tagInput?.trim()?.toLowerCase()]);
              setTagInput("");
            }
          }}
        />
      </div>
      {error && <ErrorText text={errorText} />}
    </div>
  );
};

export default TagsInput;
