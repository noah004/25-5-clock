import "../styles/Tasks.css";

import { useState } from "react";

export default function Tasks() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [areTasksComplete, setAreTaskComplete] = useState([]);

  function renderTasks(tasks) {
    let renderedTasks = [];
    for (let index in tasks) {
      let isComplete = areTasksComplete[index];
      let checkMarkImage = isComplete
        ? "../images/check-mark.svg"
        : "../images/circle.svg";
      let temp = (
        <li className="list-group-item">
          {areTasksComplete[index] ? <s>{tasks[index]}</s> : tasks[index]}
          <img
            onClick={() => handleClick(index)}
            className={
              areTasksComplete[index]
                ? "float-end task-complete"
                : "float-end task-incomplete"
            }
            src={checkMarkImage}
          />
        </li>
      );
      renderedTasks.push(temp);
    }
    return renderedTasks;
  }

  const keyDownHandler = (event) => {
    if (event.key === "Enter" && inputTask != "") {
      let updatedTasks = [...tasks, inputTask];
      setTasks(updatedTasks);
      setInputTask("");

      let updatedAreTasksComplete = [...areTasksComplete, false];
      setAreTaskComplete(updatedAreTasksComplete);
    }
  };

  function handleClick(index) {
    let areTasksCompleteCopy = [...areTasksComplete];
    if (areTasksComplete[index]) {
      let tasksCopy = [...tasks];
      tasksCopy.splice(index, 1);
      setTasks(tasksCopy);

      areTasksCompleteCopy.splice(index, 1);
      setAreTaskComplete(areTasksCompleteCopy);
    } else {
      areTasksCompleteCopy[index] = true;
      setAreTaskComplete(areTasksCompleteCopy);
    }
  }

  return (
    <div className="to-do">
      <h3 className="tasks-title">Tasks</h3>
      <ul className="list-group">{renderTasks(tasks)}</ul>
      <li className="list-group-item">
        <input
          type="text"
          placeholder="Add Task"
          value={inputTask}
          onChange={(input) => setInputTask(input.target.value)}
          onKeyDown={keyDownHandler}
        />
      </li>
    </div>
  );
}
