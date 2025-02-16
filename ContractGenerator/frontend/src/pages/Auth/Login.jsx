import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCredentials } from "../../redux/slices/authSlice";
import {
  useLoginMutation,
  useForgotPasswordMutation,
} from "../../redux/slices/Api/authApiSlice";
import logo from "../../assets/1.png";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/Tasks");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const forgotPasswordHandler = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      toast.success("Password reset email sent successfully");
      setShowForgotPassword(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/Tasks");
    }
  }, [user, navigate]);

  return (
    <div className="main-container">
      <div className="left-side flex justify-center items-center">
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-48 h-48 mx-auto object-contain"
          />

          <h1 className="text-5xl font-bold text-[#1f418a]">
            ContractGenerator
          </h1>
        </div>
      </div>

      <div className="right-side">
        <div className="login-box">
          <h2>Login</h2>
          {Object.keys(errors).length > 0 && (
            <div style={{ color: "red" }}>
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="user-box">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                required
              />
              <label>Email:</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                required
              />
              <label>Password:</label>
            </div>
            <button type="submit" disabled={loginLoading}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </button>
          </form>
          <div className="forgot-password-link">
            <button onClick={() => setShowForgotPassword(true)}>
              Forgot Password
            </button>
          </div>{" "}
          <br></br>
          {showForgotPassword && (
            <div className="forgot-password-box">
              <h2>Reset Password</h2>

              <form onSubmit={handleSubmit(forgotPasswordHandler)}>
                <div className="user-box">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    required
                  />
                  <label>Email:</label>
                </div>
                <button type="submit" disabled={forgotPasswordLoading}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Reset Password
                </button>
              </form>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
