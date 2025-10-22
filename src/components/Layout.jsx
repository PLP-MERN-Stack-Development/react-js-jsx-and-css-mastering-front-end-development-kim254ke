import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  <Navbar />
  <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
    <Outlet />
  </main>
  <Footer />
</div>
  );
}
