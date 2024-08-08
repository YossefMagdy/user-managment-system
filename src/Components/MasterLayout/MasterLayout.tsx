import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import style from "./masterLayout.module.css";
import { useAuth } from "../../Core/Hooks/useAuth";
import { useState } from "react";

export default function MasterLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [sideBarStatus, setSideStatus] = useState(false);
  if (loading) {
    return <p>still loading ....</p>;
  }
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }

  function onSideBarCollapse(collapsed: boolean) {
    setSideStatus(collapsed);
  }

  return (
    <>
      <main className={style.main_layout}>
        <div
          style={{ width: `${sideBarStatus ? "140px" : "270px"}` }}
          className={style.sidebar}
        >
          <SideBar sideBarStatus={onSideBarCollapse} />
        </div>
        <div className={style.content}>
          <Navbar />
          <div className="container">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
