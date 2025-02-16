import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/Api/taskApiSlice";
import { toast } from "sonner";

const AddSubTask = ({ open, setOpen, id }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSubTask] = useCreateSubTaskMutation();
  
  const handleOnSubmit = async (data) => {
    try {
      const res = await addSubTask({ ...data, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
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
            {t("addSubTask:title")}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder={t("addSubTask:subTaskTitle")}
              type='text'
              name='title'
              label={t("addSubTask:subTaskTitle")}
              className='w-full rounded'
              register={register("title", {
                required: t("addSubTask:titleRequired"),
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
              <Textbox
                placeholder={t("addSubTask:taskDate")}
                type='date'
                name='date'
                label={t("addSubTask:taskDate")}
                className='w-full rounded'
                register={register("date", {
                  required: t("addSubTask:dateRequired"),
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <Textbox
                placeholder={t("addSubTask:tag")}
                type='text'
                name='tag'
                label={t("addSubTask:tag")}
                className='w-full rounded'
                register={register("tag", {
                  required: t("addSubTask:tagRequired"),
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
              label={t("addSubTask:addTask")}
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label={t("addSubTask:cancel")}
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;
