import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Button from "./components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";

const router = createBrowserRouter([{
  path: "/",
  element: <Home />,
}]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
