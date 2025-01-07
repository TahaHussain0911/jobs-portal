import React from "react";
import classes from "./JobCard.module.css";
import { BsBookmark } from "react-icons/bs";
import { AppleSmall, User1, User2, User3 } from "../../helper/imagePath";
import { IoLocationOutline } from "react-icons/io5";
import Button from "../../components/Button";
import { renderCurrency } from "../../helper/helperFunction";
const jobTypeStyles = (type) => {
  switch (type) {
    case "part-time":
      return {
        color: "#0BA02C",
        backgroundColor: "#E7F6EA",
      };
    case "full-time":
      return {
        color: "#6300B3",
        backgroundColor: "#F1E0FF",
      };
    default:
      break;
  }
};

const JobCard = ({ job }) => {    
  return (
    <div className={classes.jobCard}>
      <div className={classes.header}>
        <h5 className={classes.jobTitle}>{job?.title}</h5>
        <BsBookmark />
      </div>
      <div className={classes.subHeader}>
        <span
          className={classes.jobType}
          style={{
            ...jobTypeStyles(job?.jobType),
          }}
        >
          {job?.jobType}
        </span>
        <p>
          Salary: {renderCurrency(job?.currency, job?.salary?.min)} -{" "}
          {renderCurrency(job?.currency, job?.salary?.max)}
        </p>
      </div>
      <div className={classes.company}>
        <div className={classes.companyLogo}>
          <img src={job?.company?.companyLogo} />
        </div>
        <div className={classes.companyInfo}>
          <h6>{job?.company?.name}</h6>
          <p className={classes.location}>
            <IoLocationOutline /> {job?.company?.location}
          </p>
        </div>
      </div>
      <div className={classes.applicantsDiv}>
        <div className={classes.applicants}>
          {job?.applicants?.slice(0, 3)?.map((user, index) => (
            <img src={user?.image} key={index} />
          ))}
        </div>
        {job?.applicants?.length - 3 > 0 && (
          <p>{job?.applicants?.length - 3}+ applicants</p>
        )}
      </div>
      <div className={classes.actionBtns}>
        <Button variant="secondary" label={"View Details"} />
        <Button label={"Apply now"} />
      </div>
    </div>
  );
};

export default JobCard;
