import useHttp from "../../Core/Hooks/useHttp";
import { User } from "../../Core/model/userInfo.model";
import { BaseResponse } from "../../Core/model/BaseResponse";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../../store/StoreContext";
import ModalComponent from "../Modal/modal";
const requestHandler = {
  method: "get",
};

export default function UserList() {
  const { data: usersData } = useHttp<BaseResponse<User[]>>(
    "https://dummyjson.com/users",
    requestHandler,
  );
  const { userList, addUsersList } = useContext(StoreContext);
  const [show, setShow] = useState(false);
  const [chosenUser, setChosenUser] = useState<User>();
  const handleClose = () => setShow(false);

  const handleShowAlertModel = (user: User) => {
    setChosenUser(user);
    console.log(user);
    setShow(true);
  };

  useEffect(() => {
    addUsersList(usersData?.users);
  }, [addUsersList, usersData]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Users List</h4>
        <button className="btn btn-warning">Add New User</button>
      </div>
      <div className="hr-spacer my-3"></div>
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
                    <i className="fa fa-edit text-warning me-3"></i>
                    <i
                      className="fa fa-trash text-warning"
                      onClick={() => handleShowAlertModel(user)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}

          <ModalComponent
            modelBody={`Are you Sure you want to Delete ${chosenUser?.firstName + " " + chosenUser?.lastName} ?`}
            show={show}
            closeModal={handleClose}
          />
        </tbody>
      </table>
    </>
  );
}
