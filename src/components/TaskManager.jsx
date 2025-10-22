import React, { useState, useEffect } from "react";
import Button from "./Button";

const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)); }, [tasks]);
  const addTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now(), text, completed: false, createdAt: new Date().toISOString() }]);
    }
  };
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  return { tasks, addTask, toggleTask, deleteTask };
};

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleSubmit = (e) => { e.preventDefault(); addTask(newTaskText); setNewTaskText(""); };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Task Manager</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button type="submit" variant="primary">Add</Button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "active" ? "primary" : "secondary"} onClick={() => setFilter("active")}>Active</Button>
        <Button variant={filter === "completed" ? "primary" : "secondary"} onClick={() => setFilter("completed")}>Completed</Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  readOnly
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-100"}`}>
                  {task.text}
                </span>
              </div>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>{tasks.filter((t) => !t.completed).length} tasks remaining</p>
      </div>
    </div>
  );
};

export default TaskManager;
