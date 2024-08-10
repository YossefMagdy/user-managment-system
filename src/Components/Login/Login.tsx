import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../Core/model/login.model";
import useHttp from "../../Core/Hooks/useHttp";
import { useContext, useEffect } from "react";
import StoreContext from "../../store/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginInfo {
  firstName: string;
  lastName: string;
}
const requestConfig = {
  method: "post",
  // headers: {
  //   "Content-type": "application/json",
  // },
};

export default function Login() {
  const navigate = useNavigate();
  const { addUserInfo } = useContext(StoreContext);
  const {
    data: loginInfo,
    sendRequest,
    isLoading,
  } = useHttp<LoginInfo>("https://dummyjson.com/auth/login", requestConfig);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await sendRequest(data);
  };

  useEffect(() => {
    if (loginInfo) {
      addUserInfo(loginInfo);
      toast(`Welcome ${loginInfo["firstName"] + " " + loginInfo["lastName"]}`, {
        autoClose: 1000,
        type: "success",
        closeOnClick: true,
        theme: "colored",
      });
      navigate("/dashboard");
    }
  }, [addUserInfo, loginInfo, navigate]);

  return (
    <>
      <div className="login-container container-fluid">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4 bg-white rounded p-4 text-center">
            <h6>User Managment system</h6>
            <p className="text-muted">
              Enter your crendetials to access your account
            </p>
            {isSubmitted && !isValid && (
              <div className="alert alert-danger">
                You Must Fill the form first ...
              </div>
            )}
            <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="userName" className="text-muted my-2">
                userName
              </label>
              <input
                {...register("username", { required: "UserName Is Required" })}
                type="text"
                id="userName"
                placeholder="Enter you email"
                className="form-control"
              />
              {errors.username && touchedFields.username && (
                <div className="alert alert-info">
                  {errors?.username.message}
                </div>
              )}

              <label htmlFor="password" className="my-2 text-muted">
                Password
              </label>
              <input
                {...register("password", { required: "password is required" })}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
              />
              {errors.password && touchedFields.password && (
                <div className="alert alert-info">
                  {errors?.password.message}
                </div>
              )}

              <button className="btn btn-warning w-100 text-white my-4">
                Sign In{" "}
                <i
                  className={`fa-solid  ${isLoading ? "fa-spinner fa-spin-pulse" : ""} `}
                ></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
