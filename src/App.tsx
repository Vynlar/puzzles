import { LoginIntro, LoginPuzzle } from "./puzzles/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Welcome } from "./welcome";
import { OmbrePuzzle } from "./puzzles/ombre";
import { OmbreIntro } from "./puzzles/ombre/intro";

import "./App.css";
import { OmbreWin } from "./puzzles/ombre/win";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <LoginIntro />,
  },
  {
    path: "/login/play",
    element: <LoginPuzzle />,
  },
  {
    path: "/ombre",
    children: [
      {
        index: true,
        element: <OmbreIntro />,
      },
      {
        path: "play",
        element: <OmbrePuzzle />,
      },
      {
        path: "win",
        element: <OmbreWin />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
