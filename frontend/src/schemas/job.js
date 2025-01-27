import * as yup from "yup";
export const jobSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Company Name is required!")
    .min(3, "Company Name should be atleast of 3 characters!"),
  companyLogo: yup
    .mixed()
    .test(
      "is-file-or-string",
      "Company Logo must be a valid file or path",

      (value) => {
        return (
          typeof value === "string" ||
          (value && typeof value === "object" && value instanceof File)
        );
      }
    )
    .required("Company Logo is required!"),
  title: yup.string().required("Title is required").min(5, "Incomplete Title"),
  tags: yup.array().of(yup.string()),
  jobRole: yup.object().required("Job Role is required!"),
  experience: yup.object().required("Experience is required!"),
  jobType: yup.object().required("Job Type is required!"),
  workMode: yup.object().required("Work mode is required!"),
  currency: yup.object().required("Currency is required!"),
  salary: yup.object().shape({
    min: yup
      .number()
      .required("Min Salary is required!")
      .test(
        "min-less-than-max",
        "Min Salary should not be greater than Max Salary",
        function (value) {
          const { max } = this.parent;
          return value <= max;
        }
      ),
    max: yup.number().required("Max Salary is required!"),
  }),
  country: yup
    .mixed()
    .required("Country is required!")
    .test(
      "country-validation",
      "Country cannot be empty",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && !Array.isArray(value))
    ),
  state: yup
    .mixed()
    .required("State is required!")
    .test(
      "state-validation",
      "State cannot be empty",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && !Array.isArray(value))
    ),
  city: yup
    .mixed()
    .required("City is required!")
    .test(
      "city-validation",
      "City cannot be empty",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && !Array.isArray(value))
    ),
});
