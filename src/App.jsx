<div className="bg-blue-600 text-white p-4 text-xl rounded-lg shadow-md">
  ✅ Tailwind v4 is working perfectly!
</div>

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TaskManager from "./components/TaskManager";
import ApiData from "./components/ApiData";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TaskManager />} />
          <Route path="/api-data" element={<ApiData />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
