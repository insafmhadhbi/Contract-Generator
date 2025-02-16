import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../redux/slices/Api/authApiSlice";
import logo from "../../assets/1.png";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  
  const onSubmit = async (data) => {
    try {
      await resetPassword({ token, password: data.password }).unwrap();
      toast.success('Password reset successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

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
          <h2>Reset Password</h2>
          {Object.keys(errors).length > 0 && (
            <div style={{ color: "red" }}>
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-box">
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                required
              />
              <label>New Password:</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match'
                })}
                required
              />
              <label>Confirm Password:</label>
            </div>
            <button type="submit" disabled={isLoading}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
