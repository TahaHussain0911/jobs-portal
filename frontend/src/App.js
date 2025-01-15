import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Button from "./components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
