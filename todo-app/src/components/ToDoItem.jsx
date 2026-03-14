import React, { useState } from "react";

function ToDoItem({ task, deleteTask, toggleComplete, editTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">

      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="border p-1"
        />
      ) : (
        <span
          onClick={() => toggleComplete(task.id)}
          className={`cursor-pointer ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>
      )}

      <div className="space-x-2">

        {isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default ToDoItem;