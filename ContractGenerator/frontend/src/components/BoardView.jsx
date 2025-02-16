
import React from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  const renderTasks = (taskList, status) => {
    if (!taskList) {
      return <div>No tasks available</div>;
    }

    return taskList.map((task, index) => (
      <TaskCard key={index} task={task} handleOnDrag={handleOnDrag} />
    ));
  };

  // Drag and drop handler functions
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrag = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleOnDrop = async (e, stage) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    try {
      await axios.put(`http://localhost:8080/api/task/${task._id}/stage`, { stage });
      // Optionally, you can refresh the task list here
    } catch (error) {
      console.error("Error updating task stage:", error);
    }
  };

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      <div
        className='flex flex-col items-center gap-4'
        onDragOver={handleOnDragOver}
        onDrop={(e) => handleOnDrop(e, "todo")}
      >
        <h2 className='text-lg font-bold'></h2>
        {renderTasks(tasks.todo, "todo")}
      </div>
      <div
        className='flex flex-col items-center gap-4'
        onDragOver={handleOnDragOver}
        onDrop={(e) => handleOnDrop(e, "in progress")}
      >
        <h2 className='text-lg font-bold'></h2>
        {renderTasks(tasks.ongoing, "in progress")}
      </div>
      <div
        className='flex flex-col items-center gap-4'
        onDragOver={handleOnDragOver}
        onDrop={(e) => handleOnDrop(e, "completed")}
      >
        <h2 className='text-lg font-bold'></h2>
        {renderTasks(tasks.completed, "completed")}
      </div>
    </div>
  );
};

export default BoardView;
