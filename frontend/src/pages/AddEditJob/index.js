import React from "react";
import classes from "./AddEditJob.module.css";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Container } from "react-bootstrap";
import Input from "../../components/Input";
import { useFormik } from "formik";
import DropDown from "../../components/DropDown";
import { jobRoles } from "../../helper/options";
const AddEditJob = () => {
  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
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
          <form className={classes.jobForm}>
            <div className={classes.inputField}>
              <Input
                label={"Job Title"}
                placeholder={"Add job title"}
                value={values.title}
                name={"title"}
                onChange={handleChange}
                errorText={errors.title}
                error={errors.title && touched.title}
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
