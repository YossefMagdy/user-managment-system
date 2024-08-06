import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Login from "./Components/Login/Login";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import Home from "./Components/Home/Home";
import UserList from "./Components/UserList/UserList";
import UserData from "./Components/UserData/UserData";
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound/NotFound";

import { ToastContainer } from "react-toastify";
import { StoreContextProvider } from "./store/StoreContext";
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <UserList /> },
        { path: "userData", element: <UserData /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return (
    <>
    <StoreContextProvider>
      <RouterProvider router={routes} />
    </StoreContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
