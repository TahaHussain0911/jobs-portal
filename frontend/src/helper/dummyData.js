import { AppleSmall, GoogleSmall, IntelSmall, User1, User2, User3 } from "./imagePath";

export const jobsData = [
  {
    title: "Technical Support Specialist",
    salary: {
      min: 20000,
      max: 25000,
    },
    currency: "PKR",
    jobType: "part-time",
    company: {
      name: "Google Inc.",
      location: "Karach, Pakistan",
      companyLogo: GoogleSmall,
    },
    applicants: [
      {
        image: User1,
      },
      {
        image: User2,
      },
      {
        image: User3,
      },
      ...Array(6).fill({}),
    ],
  },
  {
    title: "Senior UI/UX Designer",
    salary: {
      min: 30000,
      max: 35000,
    },
    currency: "$",
    jobType: "full-time",
    company: {
      name: "Apple",
      location: "Boston, USA",
      companyLogo: AppleSmall,
    },
    applicants: [
      {
        image: User1,
      },
      {
        image: User3,
      },
      {
        image: User2,
      },
      ...Array(3).fill({}),
    ],
  },
  {
    title: "Marketing Officer",
    salary: {
      min: 30000,
      max: 35000,
    },
    currency: "$",
    jobType: "part-time",
    company: {
      name: "Intel Corp",
      location: "Boston, USA",
      companyLogo: IntelSmall,
    },
    applicants: [
      {
        image: User1,
      },
      {
        image: User3,
      },
      {
        image: User2,
      },
      ...Array(3).fill({}),
    ],
  },
];
