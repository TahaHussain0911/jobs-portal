import React, { useRef } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaFileCsv, FaFileUpload } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import RenderMediaComponent from "../RenderMediaComponent";
import classes from "./AttachmentUpload.module.css";
import Button from "../Button";
import { imageUrl } from "../../helper/axios";

let docType =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const InputUploadType = (types) => {
  let modifiedTypes = types.split(",");
  let finalTypes = [];
  for (let key in modifiedTypes) {
    switch (modifiedTypes[key]) {
      case "image":
        finalTypes?.push("image/*");
        break;
      case "video":
        finalTypes?.push("video/*");
        break;
      case "pdf":
        finalTypes?.push("application/pdf");
        break;
      case "docx":
        finalTypes?.push(docType);
        break;
      default:
        finalTypes?.push("*");
        break;
    }
  }
  return finalTypes.join(",");
};

function AttachmentUpload({
  state,
  setter,
  edit = true,
  onEdit,
  onDelete,
  acceptedTypes = "*",
  label,
}) {
  const inputRef = useRef(null);
  const HandleUploadFile = (e) => {
    let fileType = e.target.files[0].type;
    if (fileType?.split("/")[0] == "image") {
      fileType = "image/*";
    }
    const allowedFileTypes = InputUploadType(acceptedTypes);
    if (
      acceptedTypes === "*" ||
      allowedFileTypes?.split(",")?.includes(fileType)
    ) {
      setter(e.target.files[0]);
    } else {
      toast.warn("Invalid file type");
    }
  };
  return (
    <div className={classes.box}>
      {label && <p className={classes.labelText}>{label}</p>}
      {state?.name || typeof state == "string" ? (
        <div className={classes.csvBox}>
          <RenderMediaComponent state={state} />
          {/* On Hover */}
          <div className={classes.viewBtnBox}>
            <Button
              leftIcon={<AiFillEye />}
              className={classes.icon}
              onClick={() =>
                window?.open(
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : imageUrl(state)
                )
              }
            />
          </div>
          {/* On Hover */}

          {edit && (
            <div className={classes.editAndDelete}>
              <Button
                className={classes.icon}
                onClick={() => {
                  onDelete();
                }}
                leftIcon={<RiDeleteBinLine />}
              />

              <Button
                className={classes.icon}
                onClick={() => {
                  inputRef.current.click();
                  if (onEdit) {
                    onEdit();
                  }
                }}
                leftIcon={<MdModeEdit />}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={classes.csvBox}
          onClick={() => {
            edit && inputRef.current.click();
          }}
        >
          {edit ? (
            <>
              <FaFileUpload color={"var(--main-color)"} size={30} />
              <span className={classes?.uploadText}>upload</span>
            </>
          ) : (
            <FaFileCsv color={"var(--main-color)"} size={50} />
          )}
        </div>
      )}
      {/* Input For Image Upload */}
      <input
        hidden
        type={"file"}
        ref={inputRef}
        onChange={(e) => HandleUploadFile(e)}
        accept={InputUploadType(acceptedTypes)}
      />
    </div>
  );
}

export default AttachmentUpload;
