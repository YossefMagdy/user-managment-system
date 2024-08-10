import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import StoreContext from "../../store/StoreContext";
import useHttp from "../../Core/Hooks/useHttp";
import { User } from "../../Core/model/userInfo.model";
const reqHeader = {
  method: "get",
};
export default function Profile() {
  const { userInfo } = useContext(StoreContext);
  const { data } = useHttp<User>(
    `https://dummyjson.com/user/${userInfo.id}`,
    reqHeader,
  );
  const {
    register,
    trigger,
    formState: { errors, isSubmitted, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      image: "https://dummyjson.com/icon/noahh/128",
      id: data?.id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phone: data?.phone,
      birthDate: data?.birthDate,
      age: data?.age,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: data?.birthDate ? new Date(data?.birthDate)?.toISOString().split("T")[0] :'',
        age: data.age,
        image: "https://dummyjson.com/icon/noahh/128",
      });
    }
  }, [data, reset]);

  return (
    <>
      <h4>Profile </h4>
      <div className="hr-spacer mb-5 mt-3"></div>
      {isSubmitted && !isValid && (
        <div className="alert alert-danger">
          You Must Fill the form first ...
        </div>
      )}
      <form className="h-100 d-flex justify-content-center">
        <div
          className="row align-items-center w-75 shadow  px-4 pb-5  position-relative  mt-4 rounded"
          style={{ height: "fit-content", paddingTop: "5em" }}
        >
          <div className="PofileImg shadow">
            <img src={userInfo.image} className="w-100" />
          </div>
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
                disabled
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
                disabled
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
                })}
                type="text"
                id="phoneNumber"
                className="form-control"
                placeholder="Enter Your Phone Number"
                onKeyUp={() => trigger("phone")}
                disabled
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
                disabled
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
                disabled
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
                disabled
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
        </div>
      </form>
    </>
  );
}
