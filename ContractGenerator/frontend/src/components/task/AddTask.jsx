// import React, { useState } from "react";
// import ModalWrapper from "../ModalWrapper";
// import { Dialog } from "@headlessui/react";
// import Textbox from "../Textbox";
// import { useForm } from "react-hook-form";
// import UserList from "./UserList";
// import SelectList from "../SelectList";
// import { BiImages } from "react-icons/bi";
// import Button from "../Button";
// import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/Api/taskApiSlice";
// import { toast } from "sonner";
// import { useTranslation } from "react-i18next";

// const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
// const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

// const AddTask = ({ open, setOpen, task }) => {
//   const { t } = useTranslation();
//   const defaultValues = {
//     title: task?.title || "",
//     date: "",
//     team: [],
//     stage: "",
//     priority: "",
//     assets: [],
//   };
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });
//   const [team, setTeam] = useState(task?.team || []);
//   const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
//   const [priority, setPriority] = useState(
//     task?.priority?.toUpperCase() || PRIORITY[2]
//   );
//   const [assets, setAssets] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const [createTask, { isLoading }] = useCreateTaskMutation();
//   const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
//   const uploadedFileURLs = []; 

//   const submitHandler = async (data) => {
//     for (const file of assets) {
//       setUploading(true);
//       try {
//         await uploadFile(file);
//       } catch (error) {
//         console.error("Error uploading file:", error.message);
//         return;
//       } finally {
//         setUploading(false);
//       }
//     }
//     try {
//       const newData = {
//         ...data,
//         assets: [...uploadedFileURLs],
//         team,
//         stage,
//         priority,
//       };
//       const res = task?._id
//         ? await updateTask({ ...newData, _id: task._id }).unwrap()
//         : await createTask(newData).unwrap();
//       toast.success(res.message);
//       setTimeout(() => {
//         setOpen(false);
//       }, 500);
//     } catch (err) {
//       console.log(err);
//       toast.error(err.data.message || err.error);
//     }
//   };

//   const handleSelect = (e) => {
//     setAssets(e.target.files);
//   };

//   const uploadFile = async (file) => {
//     // Your upload file logic here
//   };

//   return (
//     <>
//       <ModalWrapper open={open} setOpen={setOpen}>
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <Dialog.Title
//             as="h2"
//             className="text-base font-bold leading-6 text-gray-900 mb-4"
//           >
//             {task ? t("addTask:updateTitle") : t("addTask:title")}
//           </Dialog.Title>

//           <div className="mt-2 flex flex-col gap-6">
//             <Textbox
//               placeholder={t("addTask:taskTitle")}
//               type="text"
//               name="title"
//               label={t("addTask.taskTitle")}
//               className="w-full rounded"
//               register={register("title", { required: t("addTask:titleRequired") })}
//               error={errors.title ? errors.title.message : ""}
//             />

//             <UserList setTeam={setTeam} team={team} />

//             <div className="flex gap-4">
//               <SelectList
//                 label={t("addTask:taskStage")}
//                 lists={LISTS.map((list) => t(`addTask.${list.toLowerCase()}`))}
//                 selected={stage}
//                 setSelected={setStage}
//               />

//               <div className="w-full">
//                 <Textbox
//                   placeholder={t("addTask:taskDate")}
//                   type="date"
//                   name="date"
//                   label={t("addTask:taskDate")}
//                   className="w-full rounded"
//                   register={register("date", {
//                     required: t("addTask:dateRequired"),
//                   })}
//                   error={errors.date ? errors.date.message : ""}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <SelectList
//                 label={t("addTask:priorityLevel")}
//                 lists={PRIORITY.map((priority) => t(`addTask:${priority.toLowerCase()}`))}
//                 selected={priority}
//                 setSelected={setPriority}
//               />

//               <div className="w-full flex items-center justify-center mt-4">
//                 <label
//                   className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
//                   htmlFor="imgUpload"
//                 >
//                   <input
//                     type="file"
//                     className="hidden"
//                     id="imgUpload"
//                     onChange={(e) => handleSelect(e)}
//                     accept=".jpg, .png, .jpeg"
//                     multiple={true}
//                   />
//                   <BiImages />
//                   <span>{t("addTask.addAssets")}</span>
//                 </label>
//               </div>
//             </div>

//             <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
//               {uploading ? (
//                 <span className="text-sm py-2 text-red-500">
//                   {t("addTask:uploadingAssets")}
//                 </span>
//               ) : (
//                 <Button
//                   label={t("addTask:submit")}
//                   type="submit"
//                   className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
//                 />
//               )}

//               <Button
//                 type="button"
//                 className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                 onClick={() => setOpen(false)}
//                 label={t("addTask:cancel")}
//               />
//             </div>
//           </div>
//         </form>
//       </ModalWrapper>
//     </>
//   );
// };

// export default AddTask;
import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import Button from "../Button";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/Api/taskApiSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];


const AddTask = ({ open, setOpen, task, refetch }) => {

  const { t, i18n } = useTranslation();
  const defaultValues = {
    title: task?.title || "",
    date: "",
    team: [],
    stage: "",
    priority: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const submitHandler = async (data) => {
    try {
      const newData = {
        ...data,
        team,
        stage,
        priority,
      };
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
        refetch()
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? t("addTask:updateTitle") : t("addTask:title")}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder={t("addTask:taskTitle")}
              type="text"
              name="title"
              label={t("addTask:taskTitle")}
              className="w-full rounded"
              register={register("title", { required: t("addTask:titleRequired") })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label={t("addTask:taskStage")}
                lists={LISTS.map((list) => t(`${list.toLowerCase()}`))}
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder={t("addTask:taskDate")}
                  type="date"
                  name="date"
                  label={t("addTask:taskDate")}
                  className="w-full rounded"
                  register={register("date", {
                    required: t("addTask:dateRequired"),
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label={t("addTask:priorityLevel")}
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label={t("addTask:submit")}
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
              />
              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label={t("addTask:cancel")}
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
