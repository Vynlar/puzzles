import { LoginIntro, LoginPuzzle } from './puzzles/login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome } from './welcome'
import { OmbrePuzzle } from './puzzles/ombre'

import './App.css'

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
    element: <OmbrePuzzle />,
  },
])


export default function App() {
  return <RouterProvider router={router} />
}
