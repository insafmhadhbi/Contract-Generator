
// import React, { useState, useEffect } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import Loading from "../components/Loader";
// import Title from "../components/Title";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
// import Tabs from "../components/Tabs";
// import TaskTitle from "../components/TaskTitle";
// import BoardView from "../components/BoardView";
// import Table from "../components/task/Table";
// import AddTask from "../components/task/AddTask";
// import { useGetAllTaskQuery } from "../redux/slices/Api/taskApiSlice";

// const TABS = (t) => [
//   { title: t("tasks:boardView"), icon: <MdGridView /> },
//   { title: t("tasks:listView"), icon: <FaList /> },
// ];

// const TASK_TYPE = (t) => ({
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// });

// const Tasks = () => {
//   const { t } = useTranslation();
//   const params = useParams();

//   const [selected, setSelected] = useState(0);
//   const [open, setOpen] = useState(false);
//   const [todo, setTodo] = useState([]);
//   const [ongoing, setOngoing] = useState([]);
//   const [completed, setCompleted] = useState([]);

//   const status = params?.status || "";

//   const { data, isLoading } = useGetAllTaskQuery({
//     strQuery: status,
//     search: "",
//   });

//   const handleOnDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleOnDrag = (e, task) => {
//     e.dataTransfer.setData("task", JSON.stringify(task));
//   };

//   const handleOnDrop = (e, targetStatus) => {
//     const task = JSON.parse(e.dataTransfer.getData("task"));

//     if (targetStatus === "todo") {
//       setTodo([...todo, task]);
//       setOngoing(ongoing.filter((t) => t._id !== task._id));
//       setCompleted(completed.filter((t) => t._id !== task._id));
//     } else if (targetStatus === "in progress") {
//       setOngoing([...ongoing, task]);
//       setTodo(todo.filter((t) => t._id !== task._id));
//       setCompleted(completed.filter((t) => t._id !== task._id));
//     } else if (targetStatus === "completed") {
//       setCompleted([...completed, task]);
//       setTodo(todo.filter((t) => t._id !== task._id));
//       setOngoing(ongoing.filter((t) => t._id !== task._id));
//     }
//   };

//   useEffect(() => {
//     if (data?.tasks) {
//       setTodo(data.tasks.filter(task => task.stage === 'todo'));
//       setOngoing(data.tasks.filter(task => task.stage === 'in progress'));
//       setCompleted(data.tasks.filter(task => task.stage === 'completed'));
//     }
//   }, [data]);

//   return isLoading ? (
//     <div className='py-10'>
//       <Loading />
//     </div>
//   ) : (
//     <div className='w-full'>
//       <div className='flex items-center justify-between mb-4'>
//         <Title title={status ? t("tasks:statusTasks", { status }) : t("tasks:title")} />

//         {!status && (
//           <Button
//             onClick={() => setOpen(true)}
//             label={t("tasks:createTask")}
//             icon={<IoMdAdd className='text-lg' />}
//             className='flex flex-row-reverse gap-1 items-center bg-[#1f418a] text-white rounded-md py-2 2xl:py-2.5'
//           />
//         )}
//       </div>

//       <Tabs tabs={TABS(t)} setSelected={setSelected}>
//         {!status && (
//           <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
//             <TaskTitle label={t("tasks:taskStages:todo")} className={TASK_TYPE(t).todo} />
//             <TaskTitle label={t("tasks:taskStages:inProgress")} className={TASK_TYPE(t)["in progress"]} />
//             <TaskTitle label={t("tasks:taskStages:completed")} className={TASK_TYPE(t).completed} />
//           </div>
//         )}
//         {selected !== 1 ? (
//           <BoardView
//             tasks={{ todo, ongoing, completed }}
//             handleOnDrag={handleOnDrag}
//             handleOnDragOver={handleOnDragOver}
//             handleOnDrop={handleOnDrop}
//           />
//         ) : (
//           <div className='w-full'>
//             <Table tasks={data?.tasks} />
//           </div>
//         )}
//       </Tabs>

//       <AddTask open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Tasks;

import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/Api/taskApiSlice";
import ConfirmationDialog from "../components/Dialogs";
import { toast } from "sonner";

const TABS = (t) => [
  { title: t("tasks:boardView"), icon: <MdGridView /> },
  { title: t("tasks:listView"), icon: <FaList /> },
];

const TASK_TYPE = (t) => ({
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
});

const Tasks = () => {
  const { t } = useTranslation();
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("delete");
  const [selectedTask, setSelectedTask] = useState(null);

  const status = params?.status || "";

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status,
    search: "",
  });

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrag = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleOnDrop = async (e, targetStatus) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));

    try {
      await axios.put(`http://localhost:8080/api/task/${task._id}/stage`, { stage: targetStatus });
      refetch(); // Refresh tasks after updating stage
    } catch (error) {
      console.error("Error updating task stage:", error);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/task/${selectedTask._id}`);
      toast.success(response.data.message);
      setOpenDialog(false);

      refetch();

    } catch (error) {
      toast.error(error.response.data.message || t("trash:error"));
    }
  };

  const deleteClick = (task) => {
    setSelectedTask(task);
    setType("delete");
    setMsg(t("trash:deleteConfirmation"));
    setOpenDialog(true);
  };

  const restoreHandler = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/task/${selectedTask._id}/restore`);
      toast.success(response.data.message);
      setOpenDialog(false);
      refetch();
    } catch (error) {
      toast.error(error.response.data.message || t("trash:error"));
    }
  };

  const restoreClick = (task) => {
    setSelectedTask(task);
    setType("restore");
    setMsg(t("trash:restoreConfirmation"));
    setOpenDialog(true);
  };

  useEffect(() => {
    if (data?.tasks) {
      setTodo(data.tasks.filter((task) => task.stage === "todo"));
      setOngoing(data.tasks.filter((task) => task.stage === "in progress"));
      setCompleted(data.tasks.filter((task) => task.stage === "completed"));
    }
  }, [data]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title
          title={
            status ? t("tasks:statusTasks", { status }) : t("tasks:title")
          }
        />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label={t("tasks:createTask")}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-[#1f418a] text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS(t)} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle
              label={t("tasks:taskStages:todo")}
              className={TASK_TYPE(t).todo}
            />
            <TaskTitle
              label={t("tasks:taskStages:inProgress")}
              className={TASK_TYPE(t)["in progress"]}
            />
            <TaskTitle
              label={t("tasks:taskStages:completed")}
              className={TASK_TYPE(t).completed}
            />
          </div>
        )}
        {selected !== 1 ? (
          <BoardView
            tasks={{ todo, ongoing, completed }}
            handleOnDrag={handleOnDrag}
            handleOnDragOver={handleOnDragOver}
            handleOnDrop={handleOnDrop}
            refetch={refetch}
          />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} refetch={refetch} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} refetch={refetch} />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        onClick={type === "delete" ? deleteHandler : restoreHandler}
      />
    </div>
  );
};

export default Tasks;
