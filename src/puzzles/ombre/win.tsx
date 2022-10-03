import { Link } from "react-router-dom";

export function OmbreWin() {
  return (
    <div className="h-[100vh] bg-black text-green-500">
      <div className="flex flex-row items-center justify-center h-full gap-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <div className="font-mono tracking-widest">
          <h1 className="font-bold">success</h1>
          <p>you have solved the puzzle</p>
          <Link to="/" className="underline">
            More puzzles &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
