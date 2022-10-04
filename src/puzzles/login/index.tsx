import { useState } from "react";
import { Link } from "react-router-dom";
import { trackSolve } from "../../track";

interface User {
  email: string;
  password: string;
}

interface Message {
  message: string;
  tone: "positive" | "negative";
}

export function LoginPuzzle() {
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [title, setTitle] = useState("Login");
  const [message, setMessage] = useState({ message: "", tone: "positive" });
  const [success, setSuccess] = useState(false);
  const [mouseDragStart, setMouseDragStart] = useState<number | null>(null);
  const [barDragStart, setBarDragStart] = useState<number | null>(null);
  const [barY, setBarY] = useState<number>(0);
  const minBarY = 0;
  const maxBarY = 120;

  function validateForm() {
    if (!email) {
      setMessage({ message: "Email is required", tone: "red" });
      return false;
    }
    if (!email.includes("@")) {
      setMessage({ message: "Invalid email, must have an @", tone: "red" });
      return false;
    }
    if (!password) {
      setMessage({ message: "Password is required", tone: "red" });
      return false;
    }
    if (password.length < 8) {
      setMessage({
        message: "Password must be at least 8 characters",
        tone: "red",
      });
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validateForm()) return;
    if (title.toLowerCase() !== "login") {
      setMessage({ message: "You are not on the Login page", tone: "red" });
    } else if (registeredUser === null) {
      setMessage({
        message: "Email not recognized. Please Register below.",
        tone: "red",
      });
    } else if (barY > 10) {
      setMessage({
        message: "Confirm Password field not recognized",
        tone: "red",
      });
    } else if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      trackSolve("login");
      setSuccess(true);
    } else {
      setMessage({ message: "Password is incorrect", tone: "red" });
    }
  }

  function handleRegister() {
    if (!validateForm()) return;
    if (title.toLowerCase() !== "register") {
      setMessage({ message: "You are not on the Register page", tone: "red" });
    } else if (password !== confirmPassword) {
      setMessage({
        message: "Password must match Confirm Password",
        tone: "red",
      });
      return false;
    } else {
      setRegisteredUser({ email, password });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage({ message: "Registered", tone: "positive" });
    }
  }

  return (
    <div
      className="bg-gray-50 min-h-screen"
      onMouseMove={(e) => {
        if (barDragStart !== null && mouseDragStart !== null) {
          let newY = barDragStart + (e.clientY - mouseDragStart);
          console.log(barDragStart, mouseDragStart, e.clientY, newY);
          if (newY < minBarY) newY = minBarY;
          if (newY > maxBarY) newY = maxBarY;
          setBarY(newY);
        }
      }}
      onMouseUp={(e) => {
        console.log("drag end");
        setMouseDragStart(null);
        setBarDragStart(null);
      }}
    >
      <div className="max-w-[500px] mx-auto pt-12 space-y-4">
        <div className="bg-white border rounded">
          <div className="p-6 space-y-8">
            {success ? (
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">Congratulations!</h1>
                <p>You solved the puzzle.</p>
              </div>
            ) : (
              <>
                <div
                  className="space-y-8 px-1 overflow-hidden hide-scrollbars"
                  style={{ height: 260 + barY }}
                >
                  <input
                    className={
                      "h-12 text-4xl font-bold focus:outline-none " +
                      (title.toLowerCase() === "login" ||
                      title.toLowerCase() === "register"
                        ? "text-black"
                        : "text-gray-600")
                    }
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="h-10 border rounded focus-visible:ring focus:outline-none focus:border-blue-500 px-2"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      className="h-10 border rounded focus-visible:ring focus:outline-none focus:border-blue-500 px-2"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      id="confirm_password"
                      className="h-10 border rounded focus-visible:ring focus:outline-none focus:border-blue-500 px-2"
                      type="password"
                      name="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 items-center">
                  {message && (
                    <p
                      className={
                        message.tone === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {message.message}
                    </p>
                  )}
                  <div className="flex flex-col overflow-y-auto hide-scrollbar gap-2 h-10 snap-y snap-mandatory">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 rounded text-white px-4 min-h-10 h-10 snap-center"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 rounded text-white px-4 min-h-10 h-10 snap-center"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className="h-2 cursor-ns-resize hover:bg-gray-100"
            onMouseDown={(e) => {
              console.log("drag start");
              setMouseDragStart(e.clientY);
              setBarDragStart(barY);
            }}
          />
        </div>
        <footer className="text-sm cursor text-gray-600 text-center">
          A login-form puzzle game by Adrian Aleixandre
          <br />
          <i>Note: No browser devtools allowed!</i>
        </footer>
      </div>
    </div>
  );
}

export function LoginIntro() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[500px] mx-auto pt-12 space-y-4">
        <p>
          <strong>Goal</strong>: Log in to to the website.
        </p>
        <div>
          <strong>Rules:</strong>
          <ul>
            <li>
              No browser dev tools/element inspection. The puzzle is in the UI,
              not in the code.
            </li>
            <li>
              Desktop-only: This puzzle was designed for a mouse and keyboard.
              Touchscreens simply won't work well. If you're on a phone/tablet,
              find a computer and proceed there.
            </li>
          </ul>
        </div>

        <Link className="block text-blue-500 underline" to="play">
          Begin &gt;
        </Link>
      </div>
    </div>
  );
}
