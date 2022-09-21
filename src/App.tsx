import { LoginIntro, LoginPuzzle } from './puzzles/login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome } from './welcome'

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
  }
])


export default function App() {
  return <RouterProvider router={router} />
}
