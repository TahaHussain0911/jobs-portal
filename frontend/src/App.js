import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import BeforeLoginRoute from "./guards/BeforeLoginRoute";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "./helper/axios";
import { saveUserData } from "./store/auth/authSlice";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Jobs = lazy(() => import("./pages/Jobs"));
const AddEditJob = lazy(() => import("./pages/AddEditJob"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <BeforeLoginRoute component={<Login />} />,
  },
  {
    path: "/signup",
    element: <BeforeLoginRoute component={<Signup />} />,
  },
  {
    path: "/jobs",
    element: <BeforeLoginRoute component={<Jobs />} />,
  },
  {
    path: "/add-edit-job",
    element: <BeforeLoginRoute component={<AddEditJob />} />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { isLogin, accessToken } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(false);
  const getUser = async () => {
    setIsLoading(true);
    const response = await Get("auth/me", accessToken);
    if (response) {
      dispatch(saveUserData(response?.data?.user));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (isLogin) {
      getUser();
    }
  }, [isLogin]);
  if (isLoading) {
    return <Loader className="vh-100" />;
  }
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader className="vh-100" />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
