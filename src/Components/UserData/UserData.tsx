import { SubmitHandler, useForm } from "react-hook-form";
import { mainUser, User } from "../../Core/model/userInfo.model";
import { useContext, useEffect } from "react";
import StoreContext from "../../store/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function UserData() {
  const { addNewUser, userToEdit, editUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  let userDetails: User | undefined | null;
  const editMode = location.includes("EditUser");
  if (editMode) {
    userDetails = userToEdit;
  }

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<mainUser>({
    mode: "onTouched",
    defaultValues: {
      image: "https://dummyjson.com/icon/noahh/128",
      id: userDetails?.id ? userDetails?.id : Math.floor(Math.random() * 500),
      firstName: userDetails?.firstName ? userDetails?.firstName : "",
      lastName: userDetails?.lastName ? userDetails?.lastName : "",
      email: userDetails?.email ? userDetails?.email : "",
      phone: userDetails?.phone ? userDetails?.phone : "",
      birthDate:  userDetails?.birthDate ? moment(userDetails.birthDate).format('YYYY-MM-DD') : '',
      age: userDetails?.age ? userDetails?.age : "",
    },
  });

  useEffect(() => {
    if (!editMode) {
      reset({
        image: "https://dummyjson.com/icon/noahh/128",
        id: Math.floor(Math.random() * 500),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        age: "",
      });
    }
  }, [reset, editMode]);
  const onSubmit: SubmitHandler<mainUser> = async (data) => {
    addNewUser(data);
    navigate("/dashboard/users");
  };
  const onEdit: SubmitHandler<mainUser> = async (data) => {
    editUser(data);
    navigate("/dashboard/users");
  };

  return (
    <>
      <h4>{editMode ? "update User" : "add User"} </h4>
      <div className="hr-spacer my-3"></div>
      {isSubmitted && !isValid && (
        <div className="alert alert-danger">
          You Must Fill the form first ...
        </div>
      )}
      <form
        className="h-100 d-flex justify-content-center"
        onSubmit={editMode ? handleSubmit(onEdit) : handleSubmit(onSubmit)}
      >
        <div
          className="row align-items-center w-75 shadow  p-4    mt-4 rounded"
          style={{ height: "fit-content" }}
        >
          <div className="col-md-6">
            <div>
              <label htmlFor="FirstName">First Name</label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: { value: 3, message: "min name length is 3" },
                })}
                type="text"
                id="FirstName"
                className="form-control"
                placeholder="Enter Your First Name"
                onKeyUp={() => trigger("firstName")}
              />
            </div>
            {errors.firstName && (
              <div className="alert alert-info">
                {errors?.firstName?.message}
              </div>
            )}
            <div className="my-3">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Your Email"
                onKeyUp={() => trigger("email")}
              />
              {errors.email && (
                <div className="alert alert-info">{errors?.email?.message}</div>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                {...register("phone", {
                  required: "phone is required",
                  pattern: editMode
                    ? undefined
                    : {
                        value: /^01[0-2,5]{1}[0-9]{8}$/,
                        message: "Please enter a valid Egyptian phone number",
                      },
                })}
                type={editMode ? "text" : "number"}
                id="phoneNumber"
                className="form-control"
                placeholder="Enter Your Phone Number"
                onKeyUp={() => trigger("phone")}
              />
            </div>
            {errors.phone && (
              <div className="alert alert-info">{errors?.phone?.message}</div>
            )}
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="LastName">Last Name</label>
              <input
                {...register("lastName", { required: "last Name is required" })}
                onKeyUp={() => trigger("lastName")}
                type="text"
                id="LastName"
                className="form-control"
                placeholder="Enter Your Last Name"
              />
            </div>
            {errors.lastName && (
              <div className="alert alert-info">
                {errors?.lastName?.message}
              </div>
            )}
            <div className="my-3">
              <label htmlFor="Age">Age</label>
              <input
                {...register("age", {
                  required: "Age is required",
                  max: { value: 60, message: "Maximum  Age is  60" },
                })}
                type="number"
                id="Age"
                onKeyUp={() => trigger("age")}
                className="form-control"
                placeholder="Enter Your Age"
              />
              {errors.age && (
                <div className="alert alert-info">{errors?.age?.message}</div>
              )}
            </div>

            <div>
              <label htmlFor="BirthDate">Birth Date</label>
              <input
                {...register("birthDate", { required: "Age is required" })}
                type="date"
                onKeyUp={() => trigger("birthDate")}
                id="BirthDate"
                className="form-control"
                placeholder="Enter Your BirthDate"
              />
            </div>
            {errors.birthDate && (
              <div className="alert alert-info">
                {errors?.birthDate?.message}
              </div>
            )}
          </div>

          <button className="btn btn-warning w-auto m-auto mt-3">Save</button>
        </div>
      </form>
    </>
  );
}
