import "../styles/Tasks.css";
import { useState } from "react";

export default function Tasks({ currentTask, setCurrentTask }) {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const keyDownHandler = (event) => {
    if (event.key === "Enter" && inputTask !== "") {
      const newTask = { name: inputTask, isComplete: false };
      setTaskList([...taskList, newTask]);
      setInputTask("");
    }
  };

  const toggleComplete = (event, index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].isComplete = !updatedTaskList[index].isComplete;
    setTaskList(updatedTaskList);
    if (currentTask === taskList[index] && taskList[index].isComplete)
      toggleCurrentTask(taskList[index]);
    event.stopPropagation();
  };

  const toggleCurrentTask = (task) => {
    if (!task.isComplete) setCurrentTask(currentTask === task ? {} : task);
    else setCurrentTask({});
  };

  const deleteTask = (index) => {
    if (taskList[index] === currentTask) toggleCurrentTask(taskList[index]);
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  const handleDragStart = (e, sourceIndex) => {
    e.dataTransfer.setData("text/plain", sourceIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = e.dataTransfer.getData("text/plain");

    if (sourceIndex !== targetIndex) {
      const updatedTaskList = [...taskList];
      const [movedTask] = updatedTaskList.splice(sourceIndex, 1);

      updatedTaskList.splice(targetIndex, 0, movedTask);
      setTaskList(updatedTaskList);
    }
  };

  return (
    <div className="to-do">
      <h1 className="tasks-title">Tasks</h1>
      <ul className="list-group">
        <div className="grid-container text-center ">
          {taskList.map((task, index) => (
            <>
              <div
                onClick={() => deleteTask(index)}
                className="left-col g-col-4"
              >
                <img src="../images/delete.svg" />
              </div>
              <div className="g-col-6">
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={
                    currentTask === task
                      ? { backgroundColor: "rgba(224, 235, 242, 0.623)" }
                      : null
                  }
                  onClick={() => toggleCurrentTask(task)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {task.isComplete ? <s>{task.name}</s> : task.name}
                  <span className="badge">
                    <img
                      onClick={(event) => toggleComplete(event, index)}
                      className={
                        task.isComplete
                          ? "float-end task-complete"
                          : "float-end task-incomplete"
                      }
                      src={
                        task.isComplete
                          ? "../images/check-mark.svg"
                          : "../images/circle.svg"
                      }
                      alt={task.isComplete ? "Complete" : "Incomplete"}
                    />
                  </span>
                </li>
              </div>
            </>
          ))}
        </div>
        <li className="list-group-item d-flex align-items-center input">
          <input
            type="text"
            placeholder="Add Task"
            value={inputTask}
            onChange={(input) => setInputTask(input.target.value)}
            onKeyDown={keyDownHandler}
          />
        </li>
      </ul>
    </div>
  );
}
