import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">TaskMaster</h1>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/api-data" className="hover:underline">API Data</Link>
        <button
  onClick={toggleTheme}
  className={`px-3 py-1 rounded-md flex items-center gap-2 transition-all duration-300
    ${theme === "dark" 
      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" 
      : "bg-blue-600 text-white hover:bg-blue-700"}`}
>
  {theme === "dark" ? "Light" : "Dark"}
</button>
      </div>
    </nav>
  );
}
