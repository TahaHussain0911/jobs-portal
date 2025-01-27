import React, { useEffect } from "react";
import classes from "./AddEditJob.module.css";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import { Container, Row } from "react-bootstrap";
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
import CountryStateCity from "../../containers/CountryStateCity";
import QuillInput from "../../components/QuillInput";
import { useLocation, useNavigate } from "react-router-dom";
import { apiHeader, BaseURL, Get, Patch, Post } from "../../helper/axios";
import { useSelector } from "react-redux";
import { CreateFormData } from "../../helper/helperFunction";
import { toast } from "react-toastify";
import AttachmentUpload from "../../components/AttachmentUpload";
import Button from "../../components/Button";
import { payloadDummy } from "../../helper/dummyData";
const AddEditJob = () => {
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.authReducer);
  const { jobId } = useLocation().state || { jobId: "" };
  const handleAddEditJob = async (values) => {
    const {
      experience,
      jobType,
      jobRole,
      workMode,
      currency,
      country,
      state,
      city,
      ...restValues
    } = values;
    const params = {
      ...restValues,
      experience: experience?.value,
      jobType: jobType?.value,
      jobRole: jobRole?.value,
      workMode: workMode?.value,
      currency: currency?.value,
      country: country?.name || country,
      city: city?.name || city,
      state: state?.name || state,
    };
    const formData = CreateFormData(params);
    console.log(formData);

    const response = jobId
      ? await Patch("jobs", formData, apiHeader(access_token, true))
      : await Post("jobs", formData, apiHeader(access_token, true));
    if (response) {
      toast.success(`Job ${jobId ? "updated" : "created"} successfully!`);
      navigate("/jobs");
    }
  };
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      ...(jobId ? { jobId: "" } : {}),
      companyName: "",
      companyLogo: null,
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
      state: "",
      city: "",
      currency: currencyOptions?.[0],
    },
    validationSchema: jobSchema,
    onSubmit: handleAddEditJob,
  });
  const getJob = async () => {
    const response = {
      data: payloadDummy,
    };
    
    // const response = await Get(`jobs/${jobId}`, access_token);
    if (response) {
      const { data } = response;
      console.log(data);
      const formattedData = {
        // jobId: data._id,
        companyName: data.companyName || "",
        companyLogo: data.companyLogo || null,
        title: data.title || "",
        tags: data.tags || [],
        salary: {
          min: data.salary?.min || "",
          max: data.salary?.max || "",
        },
        experience: findOption(experienceLevel, data.experience),
        jobType: findOption(jobTypes, data.jobType),
        jobRole: findOption(jobRoles, data.jobRole),
        workMode: findOption(workModeTypes, data.workMode),
        description: data.description || "",
        country: data.country,
        state: data.state,
        city: data.city,
        currency: findOption(currencyOptions, data.currency),
      };
      setValues(formattedData);
    }
  };
  useEffect(() => {
    getJob();
    if (jobId) {
    }
  }, [jobId]);

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
            <div className={classes.fullWidth}>
              <Input
                label={"Company Name"}
                placeholder={"Enter Company Name"}
                value={values.companyName}
                setter={(e) => {
                  setFieldValue("companyName", e);
                }}
                errorText={errors.companyName}
                error={errors.companyName && touched.companyName}
              />
            </div>
            <div className={classes.fullWidth}>
              <AttachmentUpload
                state={values?.companyLogo}
                setter={(e) => {
                  setFieldValue("companyLogo", e);
                }}
                label={"Company Logo"}
                acceptedTypes="image"
              />
            </div>

            <div className={classes.fullWidth}>
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
              regexType={"number"}
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
              regexType={"number"}
              errorText={errors?.salary?.max}
              error={errors?.salary?.max && touched?.salary?.max}
            />
            <div className={classes.locationContainer}>
              <h4>Location</h4>
              <div className={classes.locationWrapper}>
                <CountryStateCity
                  selectedCountry={values.country}
                  setSelectedCountry={(e) => setFieldValue("country", e)}
                  countryError={
                    errors?.country && touched?.country
                      ? errors?.country
                      : false
                  }
                  selectedCity={values.city}
                  setSelectedCity={(e) => setFieldValue("city", e)}
                  cityError={
                    errors?.city && touched?.city ? errors?.city : false
                  }
                  selectedState={values.state}
                  setSelectedState={(e) => setFieldValue("state", e)}
                  stateError={
                    errors?.state && touched?.state ? errors?.state : false
                  }
                />
              </div>
            </div>
            <div className={mergeClass(classes.description, classes.fullWidth)}>
              <QuillInput
                label={"Description"}
                value={values.description}
                setValue={(e) => setFieldValue("description", e)}
                placeholder={"Enter Description"}
              />
            </div>
            <div className={mergeClass(classes.actionBtns, classes.fullWidth)}>
              <Button
                label={isSubmitting ? "submitting..." : "Submit"}
                disabled={isSubmitting}
                type="submit"
              />
              <Button
                label={"Cancel"}
                variant="secondary"
                disabled={isSubmitting}
                type="button"
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
