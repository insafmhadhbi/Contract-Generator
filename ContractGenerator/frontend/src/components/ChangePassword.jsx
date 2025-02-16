import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form"; 
import Button from "./Button";
import Loading from './Loader';
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/Api/UserApiSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation(); 

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning(t("changePassword:passwordMismatch"));
            return;
        }
        try {
            const res = await changeUserPassword(data).unwrap(); 
            toast.success(t("changePassword:success"));
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4' 
                    >
                        {t("changePassword:title")}
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'> 
                        <Textbox
                            placeholder={t("changePassword:newPassword")}
                            type='password'
                            name='password'
                            label={t("changePassword:newPassword")}
                            className='w-full rounded' 
                            register={register("password", {
                                required: t("changePassword:passwordRequired"),
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />
                        <Textbox
                            placeholder={t("changePassword:confirmNewPassword")}
                            type='password'
                            name='cpass'
                            label={t("changePassword:confirmNewPassword")}
                            className='w-full rounded' 
                            register={register("cpass", { 
                                required: t("changePassword:confirmPasswordRequired"),
                            })}
                            error={errors.cpass ? errors.cpass.message : ""} 
                        />
                    </div>
                    {isLoading ? (
                        <div className='py-5'> 
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex-row reverse'>
                            <Button
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-500' // Corrected className and color
                                label={t("changePassword:save")}
                            />
                            <Button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto ml-2' // Corrected className
                                onClick={() => setOpen(false)}
                            >
                                {t("changePassword:cancel")}
                            </Button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    );
};

export default ChangePassword;
