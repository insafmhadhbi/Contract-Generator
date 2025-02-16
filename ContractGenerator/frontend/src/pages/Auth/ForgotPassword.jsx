import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../../redux/slices/Api/authApiSlice";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      toast.success("Password reset email sent successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="forgot-password-box">
      <h2>Forgot Password</h2>
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
            type="email"
            {...register("email", { required: "Email is required" })}
            required
          />
          <label>Email:</label>
        </div>
        <button type="submit" disabled={isLoading}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
