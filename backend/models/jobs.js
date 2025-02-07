const { default: mongoose } = require("mongoose");
const {
  workModeTypes,
  jobTypes,
  experienceLevel,
  jobRoles,
} = require("../utils/enums");
const { generateSlug } = require("../utils/helper");

const JobSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company Name is required!"],
      minLength: 3,
    },
    companyLogo: {
      type: String,
      required: [true, "Company Logo is required!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobRole: {
      type: String,
      enum: jobRoles,
      required: [true, "Job Role is required!"],
    },
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
    jobType: {
      type: String,
      enum: jobTypes,
      required: [true, "Job Type is required!"],
    },
    experience: {
      type: String,
      enum: experienceLevel,
      required: [true, "Job Level is required!"],
    },
    workMode: {
      type: String,
      enum: workModeTypes,
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
    },
    city: {
      type: String,
      required: [true, "City is required!"],
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

JobSchema.pre(["findOneAndUpdate", "findByIdAndUpdate"], async function (next) {
  const update = this.getUpdate();

  if (update.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Jobs", JobSchema);
