import { CiLogin } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdInfoOutline, MdOutlineWorkOutline } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";

const headerRoutes = [
  {
    name: "Home",
    path: "/",
    icon: <IoHomeOutline />,
  },
  {
    name: "About",
    path: "/about",
    icon: <MdInfoOutline />,
  },
  {
    name: "Find Jobs",
    path: "/jobs",
    icon: <MdOutlineWorkOutline />,
  },
  {
    name: "Employers",
    path: "/employers",
    icon: <FaRegUser />,
  },
];
const headerButtons = [
  {
    name: "Contact Us",
    path: "/contact-us",
    icon: <RiContactsLine />,
    variant: "secondary",
  },
  {
    name: "Login",
    path: "/login",
    icon: <CiLogin />,
    variant: "primary",
  },
];
const quickLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];
const candidateLinks = [
  {
    name: "Browse Jobs",
    path: "/jobs",
  },
  {
    name: "Browse Employers",
    path: "/employers",
  },
  {
    name: "Saved Jobs",
    path: "/saved-jobs",
  },
];
const employerLinks = [
  {
    name: "Post a Job",
    path: "/create-job",
  },
  {
    name: "Browse Candidates",
    path: "/candidates",
  },
];
const phone = `+92 3451776078`;
const address = `123 Crescent Avenue, Opposite City Mall, Downtown District, Blue Bay, South Lake, California 90210, United States`;
const credits = `@ 2025 AlwaysApply - Job Portal. All rights Reserved`;

export {
  phone,
  address,
  credits,
  headerRoutes,
  headerButtons,
  quickLinks,
  candidateLinks,
  employerLinks,
};
