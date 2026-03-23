import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export default function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Post not found"
              : `Server error: ${response.status}`,
          );
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  useEffect(() => {
    if (post) {
      document.title = `Post {post.id} -JSONPlaceholder Blog`;
    }
    return () => {
      document.title = "JSONPlaceholder Blog";
    };
  }, [post]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post #{id}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6 text-center max-w-md">{error}</p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Post not found
        </h2>
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center text-red-600 hover:text-red-800 font-medium mb-8 block"
        >
          ← Back to all posts
        </Link>

        <article className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span>Post #{post.id}</span>
            <span>•</span>
            <span>By user #{post.userId}</span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="whitespace-pre-wrap leading-relaxed">{post.body}</p>
            {/* JSONPlaceholder often repeats body – showing twice as in original data */}
            <p className="mt-6 whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
