import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/Api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/Api/UserApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const AddUser = ({ open, setOpen, userData }) => {
  const { t } = useTranslation();
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const [role, setRole] = useState(""); // State for role selection

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success(t("addUser:updateSuccess"));

        if (userData?._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        const result = await addNewUser({
          ...data,
          password: data.email, // Set password as email for now
          role: role, // Set role based on selection
        }).unwrap();
        toast.success(t("addUser:newUserSuccess"));
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error(t("addUser:error"));
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? t("addUser:updateProfile") : t("addUser:addNewUser")}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder={t("addUser:fullName")}
              type="text"
              name="name"
              label={t("addUser:fullName")}
              className="w-full rounded"
              register={register("name", {
                required: t("addUser:fullNameRequired"),
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder={t("addUser:title")}
              type="text"
              name="title"
              label={t("addUser:title")}
              className="w-full rounded"
              register={register("title", {
                required: t("addUser:titleRequired"),
              })}
              error={errors.title ? errors.title.message : ""}
            />
            {!userData && (
              <Textbox
                placeholder={t("addUser:email")}
                type="email"
                name="email"
                label={t("addUser:email")}
                className="w-full rounded"
                register={register("email", {
                  required: t("addUser:emailRequired"),
                })}
                error={errors.email ? errors.email.message : ""}
              />
            )}
            <div className="flex items-center gap-4">
              <label htmlFor="admin" className="text-gray-700">
                {t("addUser:admin")}
              </label>
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <label htmlFor="user" className="text-gray-700">
                {t("addUser:user")}
              </label>
              <input
                type="radio"
                id="user"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
            </div>
            {/* Password Field */}
            {!userData && (
              <Textbox
                placeholder={t("addUser:password")}
                type="password"
                name="password"
                label={t("addUser:password")}
                className="w-full rounded"
                register={register("password", {
                  required: t("addUser:passwordRequired"),
                })}
                error={errors.password ? errors.password.message : ""}
              />
            )}
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                label={t("addUser:submit")}
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label={t("addUser:cancel")}
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
