const otpGenerator = require("otp-generator");

const getTimeDifference = (timeInMs) => {
  const timeDiffInSecs = Math.ceil((timeInMs - Date.now()) / 1000);
  return {
    seconds: timeDiffInSecs % 60,
    minutes: Math.floor(timeDiffInSecs / 60),
  };
};

const generateOtp = () => {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

module.exports = {
  getTimeDifference,
  generateOtp,
};
