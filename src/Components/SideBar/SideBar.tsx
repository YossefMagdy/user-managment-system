import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import style from "./sideBar.module.scss";
import { useContext } from "react";
import StoreContext from "../../store/StoreContext";
export default function SideBar() {
  const { userInfo } = useContext(StoreContext);
  return (
    <>
      <Sidebar className={`sideBar-container   h-100`}>
        <div className="container-fluid ">
          <section className={`${style.title} mt-4`}>
            <h5>
              <span className="me-2"></span> UMS
            </h5>
          </section>
          <section className={`${style.userInfo} text-center`}>
            <div className={`${style.imgcontainer} mt-3`}>
              <img src={userInfo.image} alt="user" />
            </div>
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
                  color: "black",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <MenuItem
              className="my-2"
              icon={<i className="fa-solid fa-house"></i>}
              component={<NavLink to="/dashboard/home" />}
            >
              Home
            </MenuItem>
            <MenuItem
              className="my-2"
              icon={<i className="fa-solid fa-users"></i>}
              component={<NavLink to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              className="my-2"
              icon={<i className="fa-solid fa-user"></i>}
              component={<NavLink to="/dashboard/userData" />}
            >
              User-Data
            </MenuItem>
            <MenuItem
              className="my-2"
              icon={<i className="fa-solid fa-user"></i>}
              component={<NavLink to="/dashboard/profile" />}
            >
              Profile
            </MenuItem>
          </Menu>
        </div>

        <Menu>
          <MenuItem
            className={`${style.login_menu}`}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            component={<NavLink to="/login" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}
