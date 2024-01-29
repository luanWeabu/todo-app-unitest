import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  function addTask() {
    /**
     * 2 Trường hợp:
     * - input value empty
     * - input value không empty
     */
    if (currentTask.trim() !== "") {
      setTasks([...tasks, { title: currentTask, completed: false }]);
      setCurrentTask("");
    }
  }

  function removeTask(index) {
    const updatedTask = [...tasks];
    updatedTask.splice(index, 1);
    setTasks(updatedTask);
  }
  function toggleCompletion(index) {
    let updatedTasks = [...tasks];
    console.log(updatedTasks);
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div className="title-todo">
          <h1 data-testid="heading-todo">To-Do List</h1>
          <p data-testid="to-do-description">
            Enter text into the input field to add items to your list
          </p>
          <p data-testid="to-do-description">
            Click the "X" to remove the item from your list
          </p>
          <p data-testid="to-do-description">
            Click the item to mark it as complete.
          </p>
        </div>
        <div className="todo-action">
          <input
            data-testid="text-input-todo"
            type="text"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <button
            data-testid="button-todo-addtion"
            className="addition-item"
            onClick={addTask}
          >
            +
          </button>
        </div>
      </div>
      
      <div data-testid="task-list-container">
        {tasks.map((task, index) => {
          return (
            <div
              data-testid="item-list"
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className={`item-todo${task.completed ? " completed" : ""} `}
              >
                <div
                  data-testid="toggle-complete"
                  onClick={() => toggleCompletion(index)}
                >
                  {task.title}{task.completed ? "(completed)" : ""}
                </div>
                <a
                  data-testid="button-remove-item"
                  onClick={removeTask}
                  style={{ cursor: "pointer", fontSize: "25px" }}
                >
                  X
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
