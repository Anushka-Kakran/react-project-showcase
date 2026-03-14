import React, { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-200">

      <Header />

      <div className="max-w-md mx-auto mt-6">

        <div className="flex mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border p-2 rounded-l"
          />

          <button
            onClick={addTask}
            className="bg-blue-900 text-white px-4 rounded-r"
          >
            Add
          </button>
        </div>

        <ToDoList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />

      </div>
    </div>
  );
}

export default App;