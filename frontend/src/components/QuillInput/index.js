import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classes from "./QuillInput.module.css";
import { mergeClass } from "../../helper/mergeClass";

const customQuillStyles = {
  ".ql-editor::before": {
    content: "attr(data-placeholder)",
    fontStyle: "normal",
    color: "#888", // Custom placeholder color
    pointerEvents: "none",
    position: "absolute",
    left: "10px", // Adjust padding if needed
  },
};
function QuillInput({ value, setValue, label, placeholder }) {
  return (
    <>
      <style>
        {`
            .quil-container .ql-toolbar,.quil-container .ql-container{
                border: 1px solid var(--border-color);
                border:0px;
            }
            .ql-editor::before {
                content: attr(data-placeholder); /* Default behavior for placeholder */
                font-style: normal !important; /* Example style */
                color: var(--input-placeholder) !important;
                font-family: var(--ff-primary-reg);
                font-size: var(--fs-small);
                text-transform: capitalize;
            }
        `}
      </style>
      <div
        className={mergeClass("quil-container", classes.quilDiv)}
        style={customQuillStyles}
      >
        {label && <p>{label}</p>}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className={classes.quillInput}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default QuillInput;
