import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import style from "./masterLayout.module.css";
import { useAuth } from "../../Core/Hooks/useAuth";
import { useState } from "react";

export default function MasterLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  if (loading) {
    return <p>still loading ....</p>;
  }
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }

  function onSideBarCollapse() {
    setCollapsed((prev) => !prev);
  }

  return (
    <>
      <main className={style.main_layout}>
        <div
          style={{ width: `${collapsed ? "120px" : "250px"}` }}
          className={style.sidebar}
        >
          <SideBar sideBarcollapsed={collapsed} />
        </div>
        <div className={style.content}>
          <Navbar sideBarStatus={onSideBarCollapse} />
          <div className="container h-100">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
