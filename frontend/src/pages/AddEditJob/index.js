import React from "react";
import classes from "./AddEditJob.module.css";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Container } from "react-bootstrap";
import Input from "../../components/Input";
import { useFormik } from "formik";
import DropDown from "../../components/DropDown";
import { experienceLevel, jobRoles, jobTypes, workModeTypes } from "../../helper/options";
import { mergeClass } from "../../helper/mergeClass";
import TagsInput from "../../components/TagsInput";
import { jobSchema } from "../../schemas/job";
const AddEditJob = () => {
  const handleAddEditJob = async (values) => {};
  const { values, errors, touched, setFieldValue, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        title: "",
        tags: [],
        salary: {
          min: "",
          max: "",
        },
        experience: null,
        jobType: null,
        jobRole: null,
        workMode: null,
        description: "",
        country: "",
        city: "",
      },
      validationSchema: jobSchema,
      onSubmit: handleAddEditJob,
    });

  return (
    <>
      <Header />
      <div className={classes.addEditJob}>
        <Container>
          <div className={classes.header}>
            <h1>Post a job</h1>
            <p>Find the best talent for your company</p>
          </div>
          <form className={classes.jobForm} onSubmit={handleSubmit}>
            <div className={mergeClass(classes.inputField, classes.fullWidth)}>
              <Input
                label={"Job Title"}
                placeholder={"Add job title"}
                value={values.title}
                name={"title"}
                setter={(e) => {
                  setFieldValue("title", e);
                }}
                errorText={errors.title}
                error={errors.title && touched.title}
              />
            </div>
            <div className={classes.fullWidth}>
              <TagsInput
                label={"Tags"}
                value={values.tags}
                setter={(e) => {
                  setFieldValue("tags", e);
                }}
                errorText={errors.tags}
                error={errors.tags && touched.tags}
              />
            </div>
            <div className={classes.inputField}>
              <DropDown
                label={"Job Role"}
                placeholder={"Select Job Role"}
                value={values.jobRole}
                setter={(e) => {
                  setFieldValue("jobRole", e);
                }}
                options={jobRoles}
                errorText={errors.jobRole}
                error={errors.jobRole && touched.jobRole}
              />
            </div>
            <div className={classes.inputField}>
              <DropDown
                label={"Experience Level"}
                placeholder={"Select Experience Level"}
                value={values.experience}
                setter={(e) => {
                  setFieldValue("experience", e);
                }}
                options={experienceLevel}
                errorText={errors.experience}
                error={errors.experience && touched.experience}
              />
            </div>
            <div className={classes.inputField}>
              <DropDown
                label={"Job Type"}
                placeholder={"Select Job Type"}
                value={values.jobType}
                setter={(e) => {
                  setFieldValue("jobType", e);
                }}
                options={jobTypes}
                errorText={errors.jobType}
                error={errors.jobType && touched.jobType}
              />
            </div>
            <div className={classes.inputField}>
              <DropDown
                label={"Work Mode"}
                placeholder={"Select Work Mode"}
                value={values.workMode}
                setter={(e) => {
                  setFieldValue("workMode", e);
                }}
                options={workModeTypes}
                errorText={errors.workMode}
                error={errors.workMode && touched.workMode}
              />
            </div>
          </form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddEditJob;
