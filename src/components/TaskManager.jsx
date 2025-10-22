import React, { useState, useEffect } from "react";
import Button from "./Button";

// Custom Hook to manage tasks and Local Storage persistence
const useLocalStorageTasks = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    // Effect to save tasks to Local Storage whenever the tasks state changes
    useEffect(() => { 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }, [tasks]);

    // Function to add a new task
    const addTask = (text) => {
        if (text.trim()) {
            setTasks([
                ...tasks, 
                { 
                    id: Date.now(), 
                    text, 
                    completed: false, 
                    createdAt: new Date().toISOString() 
                }
            ]);
        }
    };

    // Function to toggle a task's completion status
    const toggleTask = (id) => {
        setTasks(tasks.map(t => 
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    // Function to delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };
    
    // ➡️ NEW FUNCTION: Update the task text
    const updateTaskText = (id, newText) => {
        if (newText.trim()) {
            setTasks(tasks.map(t => 
                t.id === id ? { ...t, text: newText.trim() } : t
            ));
        }
    };

    return { tasks, addTask, toggleTask, deleteTask, updateTaskText };
};


const TaskManager = () => {
    const { tasks, addTask, toggleTask, deleteTask, updateTaskText } = useLocalStorageTasks();
    const [newTaskText, setNewTaskText] = useState("");
    const [filter, setFilter] = useState("all");
    
    // ➡️ NEW STATE: Tracks the ID of the task being edited
    const [editingId, setEditingId] = useState(null);
    // ➡️ NEW STATE: Tracks the text in the edit input field
    const [editText, setEditText] = useState("");

    // Logic for filtering tasks based on the selected filter state
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        addTask(newTaskText); 
        setNewTaskText(""); 
    };
    
    // ➡️ HANDLER: Starts the edit process
    const handleEditStart = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    // ➡️ HANDLER: Saves the edited text and exits edit mode
    const handleSaveEdit = (id) => {
        updateTaskText(id, editText);
        setEditingId(null);
        setEditText("");
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Task Manager</h2>
            
            {/* Add Task Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <Button type="submit" variant="primary">Add Task</Button>
            </form>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-6">
                <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>All</Button>
                <Button variant={filter === "active" ? "primary" : "secondary"} onClick={() => setFilter("active")}>Active</Button>
                <Button variant={filter === "completed" ? "primary" : "secondary"} onClick={() => setFilter("completed")}>Completed</Button>
            </div>

            {/* Task List */}
            <ul className="space-y-2">
                {filteredTasks.length === 0 ? (
                    <li className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No tasks found in the current filter.
                    </li>
                ) : (
                    filteredTasks.map((task) => (
                        <li 
                            key={task.id} 
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                        >
                            {/* Conditional Rendering: Show Edit Form or Task Text */}
                            {editingId === task.id ? (
                                // ➡️ EDIT FORM VIEW
                                <div className="flex items-center w-full gap-2">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="flex-grow px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        onKeyPress={(e) => { 
                                            if (e.key === 'Enter') handleSaveEdit(task.id);
                                        }}
                                    />
                                    <Button size="sm" variant="primary" onClick={() => handleSaveEdit(task.id)}>
                                        Save
                                    </Button>
                                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                // ➡️ DISPLAY VIEW
                                <>
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
                                    <div className="flex gap-2">
                                        {/* ➡️ EDIT BUTTON */}
                                        <Button size="sm" variant="secondary" onClick={() => handleEditStart(task)}>
                                            Edit
                                        </Button>
                                        {/* ➡️ DELETE BUTTON */}
                                        <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                You have {tasks.length} total tasks.
            </div>
        </div>
    );
};

export default TaskManager;