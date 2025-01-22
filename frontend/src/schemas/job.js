import * as yup from "yup";
export const jobSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(5, "Incomplete Title"),
});
