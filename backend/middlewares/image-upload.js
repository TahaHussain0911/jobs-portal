const multer = require("multer");
const path = require("path");
const { fileSize, allowedImageTypes } = require("../utils/contants");
const AppError = require("../utils/appError");
const { StatusCodes } = require("http-status-codes");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const name =
      file.originalname.split(extension)[0] + "-" + Date.now() + extension;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: fileSize,
  },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).slice(1);
    if (!allowedImageTypes?.includes(extension)) {
      return cb(new AppError("Invalid file type!", StatusCodes.BAD_REQUEST));
    }
    cb(null, true);
  },
});
module.exports = upload;
