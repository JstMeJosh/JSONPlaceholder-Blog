import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Index from "./Pages/Index";
import PageDetails from "./Pages/PageDetails";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/post/:id",
      element: <PageDetails />,
    },
  ]);
  return (
    <div className="min-h-screen text-white flex flex-col">
      <header className="bg-red-600 text-center py-5 text-3xl font-bold shadow-md sticky top-0 z-10">
        <h1>JSONPlaceholder Blog</h1>
      </header>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
