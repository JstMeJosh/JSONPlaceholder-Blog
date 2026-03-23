import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=48",
        );

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Could not load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Welcome to the JSONPlaceholder Blog!
      </h1>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow cursor-wait"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading posts...
            </button>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-10 text-xl font-medium">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No posts found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((item) => (
              <Link
                key={item.id}
                to={`/post/${item.id}`}
                className="block p-5 bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-1">
                  {item.body}
                </p>
                <div className="mt-3 text-red-600 hover:text-blue-800 hover:underline text-sm font-medium">
                  Read more →
                </div>
              </Link>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
}
