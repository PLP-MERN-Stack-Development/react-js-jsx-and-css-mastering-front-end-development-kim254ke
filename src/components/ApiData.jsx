import React, { useEffect, useState } from "react";
//  Import Spinner instead of SkeletonLoader
import Spinner from "./Spinner"; 
import Button from "./Button";

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        //  Introduce 2-second delay to show the spinner
        setTimeout(() => {
            setPosts(data);
            setLoading(false);
        }, 2000); 
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

  const handleLoadMore = () => {
    setIsLoadMoreLoading(true); // Start loading
    // Simulate API call delay (2 seconds for a clear effect)
    setTimeout(() => {
      setVisibleCount((v) => v + 6);
      setIsLoadMoreLoading(false); // Stop loading after delay
    }, 2000); // Increased delay to 2 seconds (2000ms)
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">API Data Viewer</h2>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <Button variant="secondary" onClick={() => setSearch("")}>Clear</Button>
      </div>

      {/* ⬅️ Use the new Spinner component here */}
      {loading && <Spinner />} 
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          <ul className="space-y-3">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <li key={post.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
              </li>
            ))}
          </ul>

          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-6">
              <Button 
                variant="primary" 
                onClick={handleLoadMore} 
                isLoading={isLoadMoreLoading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApiData;