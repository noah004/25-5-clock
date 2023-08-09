import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Timer from "../public/components/Timer";
import Tasks from "../public/components/Tasks";
import { useState } from "react";

const App = () => {
  const [currentTask, setCurrentTask] = useState({});

  return (
    <>
      <Timer currentTask={currentTask} />
      <hr
        className="border center-text opacity-100"
        style={{ maxWidth: "60ch", margin: "20px auto 20px auto" }}
      />
      <Tasks currentTask={currentTask} setCurrentTask={setCurrentTask} />
    </>
  );
};

export default App;
