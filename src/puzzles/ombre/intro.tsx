import { Link } from "react-router-dom";

export function OmbreIntro() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[500px] mx-auto pt-12 space-y-4">
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
