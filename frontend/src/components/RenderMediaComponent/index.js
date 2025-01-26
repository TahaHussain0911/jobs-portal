import { FaFileCsv, FaFileWord } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { BiVideo } from "react-icons/bi"; // Import BiVideo for video
import { imageUrl } from "../../helper/axios";
import {
  excelTypes,
  imageTypes,
  pdfTypes,
  videoTypes,
  wordTypes,
} from "../../helper/fileTypes";
import classes from "./RenderMediaComponent.module.css";

function RenderMediaComponent({ state }) {
  const extension = state?.name?.split(".").pop() || state?.split(".").pop();

  const renderMedia = () => {
    switch (true) {
      case imageTypes.includes(extension):
        return (
          <img
            className={classes.img}
            src={
              typeof state === "object"
                ? URL.createObjectURL(state)
                : imageUrl(state)
            }
          />
        );
      case wordTypes.includes(extension):
        return <FaFileWord className={classes.typeIcon} size={35} />;
      case excelTypes.includes(extension):
        return <RiFileExcel2Fill className={classes.typeIcon} size={35} />;
      case pdfTypes.includes(extension):
        return <MdPictureAsPdf className={classes.typeIcon} size={35} />;
      case videoTypes.includes(extension):
        return <BiVideo className={classes.typeIcon} size={35} />;
      default:
        return null;
    }
  };

  return <>{renderMedia()}</>;
}

export default RenderMediaComponent;
