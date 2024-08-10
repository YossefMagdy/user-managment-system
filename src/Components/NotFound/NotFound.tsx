import { NavLink, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation().pathname;
  let pageToNavigate = "Login";
  const dashboard = location.includes("dashboard");
  if (dashboard) {
    pageToNavigate = "home";
  }
  return (
    <>
      <div className="container justify-content-center d-flex align-items-center py-4">
        <div className="text-center">
          <img
            className="pagebuilder-mobile-only"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBbGa6iZpfUaNO1DCHpIubbV2fyUCWT84CQ&s"
            alt=""
            title=""
            data-element="mobile_image"
            data-pb-style="E7V1PYY"
          />
          <h1 className="fs-1 fw-bold mt-4">Oops!</h1>
          <p className="mt-4 fs-2">Page not found!</p>
          <button className="btn btn-dark mt-4">
            <NavLink className="nav-link" to={pageToNavigate}>
              Go to {pageToNavigate}
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}
