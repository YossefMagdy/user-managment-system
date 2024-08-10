import useHttp from "../../Core/Hooks/useHttp";
import { User } from "../../Core/model/userInfo.model";
import { BaseResponse } from "../../Core/model/BaseResponse";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../../store/StoreContext";
import ModalComponent from "../Modal/modal";
import { useNavigate } from "react-router-dom";
const requestHandler = {
  method: "get",
};

export default function UserList() {
  const navigate = useNavigate();
  const { data: usersData } = useHttp<BaseResponse<User[]>>(
    "https://dummyjson.com/users",
    requestHandler,
  );
  const { userList, addUsersList, deleteUserFromList, userNeedToEdit } =
    useContext(StoreContext);
  const [show, setShow] = useState(false);
  const [chosenUser, setChosenUser] = useState<User>();
  const handleClose = () => setShow(false);
  const acceptDelete = () => {
    setShow(false);
    deleteUserFromList(chosenUser);
  };

  const handleShowAlertModel = (user: User) => {
    setChosenUser(user);
    setShow(true);
  };

  function navigateToEditPage(user: User) {
    userNeedToEdit(user);
    navigate("/dashboard/EditUser");
  }

  useEffect(() => {
    if (
      localStorage.getItem("userList") == null ||
      JSON.parse(localStorage.getItem("userList")!).length == 0
    ) {
      addUsersList(usersData?.users);
    }
  }, [addUsersList, usersData]);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <h4>Users List ( {userList?.length} )</h4>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/dashboard/userData")}
        >
          Add New User
        </button>
      </div>
      <div className="hr-spacer my-3"></div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">BirthDate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="">
            {userList &&
              userList.map((user: User, index: number) => (
                <tr key={index} className="table-row">
                  <td>
                    <div>
                      <img src={user.image} className="w-25" />
                    </div>
                  </td>
                  <td>
                    <div>{user.firstName + " " + user.lastName}</div>
                  </td>
                  <td>
                    <div>{user.email}</div>
                  </td>
                  <td>
                    <div>{user.phone}</div>
                  </td>
                  <td>
                    <div>{user.birthDate}</div>
                  </td>
                  <td>
                    <div>
                      <i
                        className="fa fa-edit text-warning me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigateToEditPage(user);
                        }}
                      ></i>
                      <i
                        className="fa fa-trash text-warning"
                        onClick={() => handleShowAlertModel(user)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}

            <ModalComponent
              modelBody={`Are you Sure you want to Delete ${chosenUser?.firstName + " " + chosenUser?.lastName} ?`}
              show={show}
              closeModal={handleClose}
              handleaccept={acceptDelete}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}
