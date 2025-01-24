import * as yup from "yup";
export const jobSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(5, "Incomplete Title"),
  tags: yup.array().of(yup.string()),
  jobRole: yup.object().required("Job Role is required!"),
  experience: yup.object().required("Experience is required!"),
  jobType: yup.object().required("Job Type is required!"),
  workMode: yup.object().required("Work mode is required!"),
  currency: yup.object().required("Currency is required!"),
  salary: yup.object().shape({
    min: yup.number().required("Min Salary is required!"),
    max: yup.number().required("Max Salary is required!"),
  }),
});
