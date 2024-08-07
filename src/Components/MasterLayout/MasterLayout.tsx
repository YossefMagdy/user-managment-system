import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import style from "./masterLayout.module.css";
import { useAuth } from "../../Core/Hooks/useAuth";

export default function MasterLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <p>still loading ....</p>;
  }
  if (!loading && !isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <main className={style.main_layout}>
        <div className={style.sidebar}>
          <SideBar />
        </div>
        <div className={style.content}>
          <Navbar />
          <Outlet />
        </div>
      </main>
    </>
  );
}
