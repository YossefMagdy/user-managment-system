import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
