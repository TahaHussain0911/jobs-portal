import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:5000";
const BaseURL = (url) => {
  return `${apiUrl}/${url}`;
};

const apiHeader = (accessToken) => {
  if (accessToken) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

const showError = (error) => {
  let errorMsg = "";
  const errorRes = error?.response?.data?.message?.error;
  if (Array.isArray(errorRes)) {
    errorRes?.forEach((er, i) => {
      errorMsg += `${i + 1}: ${er} \n`;
    });
  } else {
    errorMsg = errorRes;
  }
  if (error?.message === "Network Error") {
    toast.error(`${error?.message}: Please check your internet`, {
      position: toast.POSITION.TOP_CENTER,
    });
  } else {
    toast.error(errorMsg, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

const Get = async (route, accessToken) => {
  const headers = {
    headers: {
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.get(BaseURL(route), headers);
    return res;
  } catch (error) {
    showError(error);
  }
};

const Post = async (route, payload, accessToken) => {
  const headers = apiHeader(accessToken);
  try {
    const res = await axios.post(BaseURL(route), payload, headers);
    return res;
  } catch (error) {
    showError(error);
  }
};
const Patch = async (route, payload, accessToken) => {
  const headers = apiHeader(accessToken);
  try {
    const res = await axios.patch(BaseURL(route), payload, headers);
    return res;
  } catch (error) {
    showError(error);
  }
};
const Delete = async (route, accessToken) => {
  const headers = apiHeader(accessToken);
  try {
    const res = await axios.delete(BaseURL(route), headers);
    return res;
  } catch (error) {
    showError(error);
  }
};

export { apiUrl, BaseURL, apiHeader, Get, Post, Patch, Delete };
