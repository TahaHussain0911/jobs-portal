const { StatusCodes } = require("http-status-codes");
const Jobs = require("../models/jobs");
const catchAsync = require("../utils/catchAsync");

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
const getSingleJob = catchAsync((req, res, next) => {});
const createJob = catchAsync((req, res, next) => {});
const updateJob = catchAsync((req, res, next) => {});
const deleteJob = catchAsync((req, res, next) => {});

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
