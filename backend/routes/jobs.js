const express = require("express");
const {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const { authorizeUser } = require("../middlewares/authorization");
const upload = require("../middlewares/image-upload");
const router = express.Router();

router.use(authorizeUser);

router.get("/", getJobs).get("/:slug", getSingleJob);
router.post("/", upload.single("companyLogo"), createJob);
router.patch("/", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
