const { default: mongoose } = require("mongoose");
const { jobVacancyTypes, jobLevelTypes } = require("../utils/enums");
const { generateSlug } = require("../utils/helper");

const JobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // jobRole: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref:"JobRole"
    // },
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: 5,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      minLength: 10,
    },
    slug: {
      type: String,
    },
    tags: {
      type: [String],
    },
    salary: {
      type: {
        min: { type: Number, required: [true, "Min Salary is required"] },
        max: { type: Number, required: [true, "Max Salary is required"] },
      },
      required: [true, "Salary is required"],
    },
    vacancy: {
      type: String,
      enum: jobVacancyTypes,
      required: [true, "Vacancy is required!"],
    },
    jobLevel: {
      type: String,
      enum: jobLevelTypes,
      required: [true, "Job Level is required!"],
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
    city: {
      type: String,
      required: [true, "Country is required!"],
    },
  },
  {
    timestamps: true,
  }
);
JobSchema.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
  next();
});

module.exports = mongoose.model("Jobs", JobSchema);
