const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { phone_regex } = require("../utils/regex");
const { jwtSecretKey, jwtExpiresAt } = require("../utils/credentials");
const { getTimeDifference, generateOtp } = require("../helper/helperFunctions");
const AppError = require("../utils/appError");
const { StatusCodes } = require("http-status-codes");
const Email = require("../utils/email");
const { otpExpiryMiliSecs } = require("../utils/contants");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    photo: {
      type: String,
      default: "default.png",
    },
    contact: {
      type: String,
      validate: {
        validator: (value) => {
          if (!value) return true;
          return phone_regex.test(value);
        },
        message: ({ value }) => `${value} is not a valid phone number!`,
      },
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      select: false,
    },
    otpVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    role: {
      enum: ["user", "admin"],
      default: "user",
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, hash);
    this.password = passwordHash;
    this.passwordChangedAt = new Date();
  }
  next();
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      email: this.email,
      name: this.name,
    },
    jwtSecretKey,
    {
      expiresIn: jwtExpiresAt,
    }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (confirmPassword) {
  const isCorrectPassword = await bcrypt.compare(
    confirmPassword,
    this.password
  );
  return isCorrectPassword;
};

UserSchema.methods.generateOtp = async function (next) {
  const otpExpiryInMs = new Date(this.otpExpiresAt).getTime();
  if (this.otpExpiresAt && otpExpiryInMs > Date.now()) {
    const { seconds, minutes } = getTimeDifference(otpExpiryInMs);
    return next(
      new AppError(
        `Please wait${
          minutes ? ` ${minutes} mins and ` : ""
        } ${seconds} seconds to request for another otp!`,
        StatusCodes.CONFLICT
      )
    );
  }
  const otp = generateOtp();
  const payload = {
    msg: `Your confirmation code is ${otp}`,
  };
  await new Email(this).sendResetPassOtp(payload);
  this.otp = otp;
  this.otpExpiresAt = new Date(Date.now() + otpExpiryMiliSecs);
};

mongoose.model("User", UserSchema);
