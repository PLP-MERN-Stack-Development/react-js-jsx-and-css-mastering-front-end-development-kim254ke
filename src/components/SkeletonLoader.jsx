const SkeletonLoader = ({ count = 6 }) => (
    <ul className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="p-4 border rounded-lg bg-gray-200 dark:bg-gray-700 h-24"></li>
      ))}
    </ul>
  );
  export default SkeletonLoader;
  