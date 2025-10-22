export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 mt-8 border-t dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        <div className="space-x-4 text-sm">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
