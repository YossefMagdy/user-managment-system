/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./sideBar.module.scss";
import { useContext } from "react";
import StoreContext from "../../store/StoreContext";

interface sideBarProps {
  sideBarcollapsed: any;
}
export default function SideBar({ sideBarcollapsed }: sideBarProps) {
  const { userInfo, handleUserLogout } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleLogout() {
    handleUserLogout();
    navigate("/login");
  }

  return (
    <>
      <Sidebar
        collapsedWidth="120px"
        collapsed={sideBarcollapsed}
        className={`sideBar-container  position-fixed h-100`}
      >
        <div className="container-fluid ">
          <section
            className={`${style.title} mt-4 d-flex align-items-center justify-content-between `}
          >
            <h5 className="m-0 me-2">
              <span className="me-2"></span> UMS
            </h5>
            <button className="btn d-block  text-center ">
              {/* <i className="fa-solid fa-bars" onClick={handleSidBarCollapse}></i> */}
            </button>
          </section>
          <section className={`${style.userInfo} text-center`}>
            {!sideBarcollapsed && (
              <div className={`${style.imgcontainer} mt-3`}>
                <img src={userInfo.image} alt="user" />
              </div>
            )}

            <h5 className="mt-3">{userInfo?.username}</h5>
            <p>Admin</p>
          </section>

          <Menu
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#FEAF00",
                  color: "white",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <MenuItem
              className={`my-2 ${sideBarcollapsed ? style.menuItem_afterCollapse : style.menuItem_beforCollapse}`}
              icon={<i className="fa-solid fa-house"></i>}
              component={<NavLink to="/dashboard/home" />}
            >
              {!sideBarcollapsed && <span>Home</span>}
            </MenuItem>
            <MenuItem
              className={`my-2 ${sideBarcollapsed ? style.menuItem_afterCollapse : style.menuItem_beforCollapse}`}
              icon={<i className="fa-solid fa-users"></i>}
              component={<NavLink to="/dashboard/users" />}
            >
              {!sideBarcollapsed && <span>Users</span>}
            </MenuItem>
            <MenuItem
              className={`my-2 ${sideBarcollapsed ? style.menuItem_afterCollapse : style.menuItem_beforCollapse}`}
              icon={<i className="fa-solid fa-user"></i>}
              component={<NavLink to="/dashboard/userData" />}
            >
              {!sideBarcollapsed && <span>Add user</span>}
            </MenuItem>
            <MenuItem
              className={`my-2 ${sideBarcollapsed ? style.menuItem_afterCollapse : style.menuItem_beforCollapse}`}
              icon={<i className="fa-solid fa-id-card"></i>}
              component={<NavLink to="/dashboard/profile" />}
            >
              {!sideBarcollapsed && <span>Profile</span>}
            </MenuItem>
          </Menu>
        </div>

        <Menu>
          <MenuItem
            className={`${style.login_menu}`}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            component={<NavLink to="/login" />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
