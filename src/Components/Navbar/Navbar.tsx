interface sideBarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sideBarStatus: any;
}
export default function Navbar({ sideBarStatus }: sideBarProps) {
  function handleSideBarCollapsed() {
    sideBarStatus();
  }
  return (
    <>
      <div className="bg-white d-flex justify-content-between flex-wrapalign-items-center px-4 py-3 mb-3 ">
        <div>
          <i
            className="fa-regular fa-circle-left m-2  "
            onClick={handleSideBarCollapsed}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div className="searchBar">
          <input type="text" placeholder="search" className="form-control" />
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    </>
  );
}
