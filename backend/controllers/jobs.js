const { StatusCodes } = require("http-status-codes");
const Jobs = require("../models/jobs");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getJobs = catchAsync(async (req, res, next) => {
  const {
    search,
    type,
    mode,
    role,
    experience,
    page = 1,
    limit = 10,
  } = req.query;
  let query = {};
  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }
  if (type) {
    query.jobType = type;
  }
  if (mode) {
    query.workMode = mode;
  }
  if (experience) {
    query.experience = experience;
  }
  const jobs = await Jobs.find(query);
  const slicedJobs = jobs.slice((page - 1) * limit, page * limit);
  res.status(StatusCodes.OK).json({
    data: slicedJobs,
    totalCount: jobs.length,
  });
});
const getSingleJob = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const job = await Jobs.findOne({ slug }).lean();
  if (!job) {
    return next(new AppError("Job doesnot exist!", StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({
    data: job,
  });
});
const createJob = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const payload = {
    user: userId,
    ...req.body,
  };
  const job = await Jobs.create(payload);
  res.status(StatusCodes.CREATED).json({
    data: job,
    msg: "Job created successfully",
  });
});
const updateJob = catchAsync((req, res, next) => {});
const deleteJob = catchAsync((req, res, next) => {});

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
