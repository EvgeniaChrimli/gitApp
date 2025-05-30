import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import HomePage from "./pages/HomePage";
import Lauout from "./components/Lauout";
import ErrorPage from "./pages/ErrorPage";
import { store } from "./redux/store";
import Favorites from "./components/Favorites/Favorites";
import RepoPage from "./components/RepoPage/RepoPage";
import { ThemeProvider } from "./components/Theme/ThemeContext";

const router = createBrowserRouter([
  {
    element: <Lauout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
        errorElement: <ErrorPage />,
      },
      {
        element: <Favorites />,
        path: "favorites",
      },
      {
        element: <RepoPage />,
        path: "/:owner/:repo",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
