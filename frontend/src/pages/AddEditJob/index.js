import React from "react";
import classes from "./AddEditJob.module.css";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Container } from "react-bootstrap";
import Input from "../../components/Input";
import { useFormik } from "formik";
import DropDown from "../../components/DropDown";
import {
  currencyOptions,
  experienceLevel,
  jobRoles,
  jobTypes,
  workModeTypes,
} from "../../helper/options";
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
        currency: currencyOptions?.[0],
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
            <DropDown
              label={"Currency"}
              placeholder={"Select Currency"}
              value={values.currency}
              setter={(e) => {
                setFieldValue("currency", e);
              }}
              options={currencyOptions}
              errorText={errors.currency}
              error={errors.currency && touched.currency}
            />
            <Input
              label={"Min Salary"}
              placeholder={"Add Min Salary"}
              value={values?.salary?.min}
              setter={(e) => {
                setFieldValue("salary.min", e);
              }}
              regexType={'number'}
              errorText={errors?.salary?.min}
              error={errors?.salary?.min && touched?.salary?.min}
            />
            <Input
              label={"Max Salary"}
              placeholder={"Add Max Salary"}
              value={values?.salary?.max}
              setter={(e) => {
                setFieldValue("salary.max", e);
              }}
              regexType={'number'}
              errorText={errors?.salary?.max}
              error={errors?.salary?.max && touched?.salary?.max}
            />
            <div className={classes.locationContainer}>
              <h4>Location</h4>
              <div className={classes.locationWrapper}>
                
              </div>
            </div>
          </form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddEditJob;
