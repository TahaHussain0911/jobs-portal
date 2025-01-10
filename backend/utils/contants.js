const otpExpiryMiliSecs = 1000 * 60 * 2;
const fileSize = 5 * 1024 * 1024;
const allowedImageTypes = ["png", "jpg", "jfif", "jpeg"];

module.exports = {
  otpExpiryMiliSecs,
  fileSize,
  allowedImageTypes,
};
