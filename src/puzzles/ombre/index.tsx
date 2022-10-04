import {
  useState,
  useRef,
  useLayoutEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useMove } from "@react-aria/interactions";
import "./ombre.css";
import metro from "./assets/metro.jpg";
import sketchbook from "./assets/sketchbook.jpg";
import roofLine from "./assets/roof_line.jpg";
import { useNavigate } from "react-router-dom";
import { trackSolve } from "../../track";

type ClassValue = string | null | undefined | ClassValue[];
type CxOptions = ClassValue[];
type CxReturn = string;

const SIZE = 50;

const cx = <T extends CxOptions>(...classes: T): CxReturn =>
  // @ts-ignore
  classes.flat(Infinity).filter(Boolean).join(" ");

interface ButtonProps {
  isDark: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

function Button({ isDark, setDarkMode, buttonRef }: ButtonProps) {
  return (
    <div
      className={cx(isDark ? "dark" : "light", "absolute z-20")}
      style={{ top: SIZE + 40, right: 50 - SIZE + 20 }}
    >
      <div
        className={cx(
          "flex items-center justify-center w-12 h-12 rounded-full text-black dark:text-white"
        )}
      >
        <button
          onClick={() => {
            setDarkMode((x) => !x);
          }}
          ref={buttonRef}
          className={cx("flex justify-center items-center")}
          style={{
            width: SIZE,
            height: SIZE,
            transform: "translate(-50%, -50%)",
          }}
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

interface PageProps {
  isDark: boolean;
  isInCircle: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  setCirclePosition: (fn: (pos: [number, number]) => [number, number]) => void;
}

function Page(props: PageProps) {
  const { isDark, isInCircle, setCirclePosition } = props;
  const { moveProps } = useMove({
    onMove: (e) => {
      setCirclePosition(([x, y]: [number, number]) => {
        x += e.deltaX;
        y += e.deltaY;
        return [x, y];
      });
    },
    onMoveStart: () => {},
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const rect = document.body.getBoundingClientRect();
    if (rect) {
      setCirclePosition(() => [rect.width - (SIZE + 20), SIZE + 40]);
    }
  }, [buttonRef.current]);

  const [numClicks, setNumClicks] = useState(0);
  const timeout = useRef<number | null>(null);
  const navigate = useNavigate();

  const clickHandler = () => {
    setNumClicks((prevNum) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        if (numClicks === 9) {
          trackSolve("ombre");
          navigate("../win");
        } else {
          setNumClicks(0);
        }
      }, 1500);
      return prevNum + 1;
    });
  };

  return (
    <>
      <div
        className={cx("font-modern", isInCircle ? "flashlight" : "")}
        {...(isInCircle ? moveProps : {})}
      >
        <div className={cx(isDark ? "dark" : "light")}>
          {isInCircle && <Button {...props} />}
        </div>
        <div className={cx(isDark ? "dark" : "light")}>
          <div
            className={cx([
              "bg-white dark:bg-black text-black dark:text-white h-screen flex flex-col relative",
            ])}
          >
            <div className="bg-green-500 text-black dark:text-white py-1 flex justify-center">
              <p
                className="whitespace-nowrap font-bold text-xs uppercase overflow-hidden text-center"
                aria-hidden="true"
              >
                {Array(5)
                  .fill(
                    <>
                      <span className="glowy-green glowy-light glowy-dark">
                        l
                      </span>
                      ight dar
                      <span className="glowy-green glowy-light glowy-dark">
                        k
                      </span>{" "}
                      br
                      <span className="glowy-green glowy-light glowy-dark">
                        i
                      </span>
                      ght dim sunny{" "}
                      <span className="glowy-green glowy-light glowy-dark">
                        c
                      </span>
                      loudy on off clear obs
                      <span className="glowy-green glowy-light glowy-dark">
                        c
                      </span>
                      ure{" "}
                    </>
                  )
                  .flat()}
              </p>
            </div>
            <div className="flex-1 flex flex-col px-8 w-full max-w-screen-lg mx-auto justify-center">
              <div className="relative z-10 space-y-8">
                <h1
                  className="block font-bold text-[60px] md:text-[120px] leading-none select-none"
                  onClick={clickHandler}
                >
                  ombre
                </h1>
                <div className="block">
                  <p className="tracking-widest">
                    con<span className="glowy-green glowy-light">t</span>e
                    <span className="glowy-green glowy-light">m</span>porary de
                    <span className="glowy-green glowy-dark">s</span>
                    <span className="glowy-green glowy-light">i</span>gn coll
                    <span className="glowy-green glowy-dark">e</span>ctive
                  </p>
                  <p className="text-gray-500">
                    where <span className="glowy-blue glowy-light">l</span>i
                    <span className="glowy-blue glowy-dark">g</span>ht and shad
                    <span className="glowy-blue glowy-dark">o</span>w{" "}
                    <span className="glowy-blue glowy-light">o</span>riginate
                  </p>
                </div>
              </div>
              <div
                className="bg-green-500 rounded-tr-[20px] w-24 h-24 md:h-36 md:w-36 absolute transform -translate-y-10 -translate-x-4 "
                onClick={clickHandler}
              />
            </div>
          </div>
        </div>
        <div className={!isDark ? "dark" : "light"}>
          <div
            className={cx(
              "bg-white dark:bg-black text-black dark:text-white text-black dark:text-white py-16"
            )}
          >
            <div className="max-w-screen-lg mx-auto px-8 space-y-12">
              <div className="space-y-2">
                <h2 className="text-center text-5xl font-bold">Our Work</h2>
                <p className="text-center text-xs uppercase tracking-widest">
                  artisinal graphic collections
                </p>
              </div>
              <div className="flex gap-4">
                {[
                  {
                    pic: metro,
                    letter: "E",
                    letterClasses: [
                      "bottom-10 right-16",
                      isInCircle ? "dark:hidden" : "hidden",
                    ],
                  },
                  {
                    pic: roofLine,
                    letter: "n",
                    letterClasses: [
                      "top-10 right-16",
                      isInCircle ? "hidden dark:block" : "hidden",
                    ],
                  },
                  {
                    pic: sketchbook,
                    letter: "t",
                    letterClasses: [
                      "bottom-10 left-16",
                      isInCircle ? "dark:hidden" : "hidden",
                    ],
                  },
                ].map(({ pic, letter, letterClasses }) => (
                  <div
                    key={pic}
                    className="relative flex-1 bg-black dark:bg-white p-8"
                  >
                    <img
                      className={cx(
                        "h-[200px] w-full object-cover",
                        isInCircle ? "invert" : ""
                      )}
                      src={pic}
                    />
                    <div
                      className={cx(
                        "absolute text-3xl z-10 text-white drop-shadow-2xl font-bold opacity-50",
                        letterClasses
                      )}
                    >
                      {letter}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={isDark ? "dark" : "light"}>
          <footer className="text-sm text-center py-12 italic bg-white dark:bg-black text-black dark:text-white">
            A puzzle by{" "}
            <a
              className="underline text-green-600"
              href="https://adrianaleixandre.com"
            >
              Adrian Aleixandre
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

export function OmbrePuzzle() {
  const [darkMode, setDarkMode] = useState(false);

  const circleRef = useRef<HTMLDivElement>(null);
  const circlePos = useRef<[number, number]>([-9999, -9999]);

  function setCirclePosition(fn: (pos: [number, number]) => [number, number]) {
    const pos = fn(circlePos.current);
    if (circleRef && circleRef.current) {
      circleRef.current.style.clipPath = `circle(${SIZE}px at ${pos[0]}px ${pos[1]}px)`;
    }
    circlePos.current = pos;
  }

  return (
    <div>
      <div
        className="w-full absolute z-10"
        style={{
          clipPath: `circle(${SIZE}px at -9999px -9999px)`,
        }}
        ref={circleRef}
      >
        <Page
          isDark={!darkMode}
          isInCircle
          setCirclePosition={setCirclePosition}
          setDarkMode={setDarkMode}
        />
      </div>
      <div className="w-full absolute z-0">
        <Page
          isDark={darkMode}
          isInCircle={false}
          setCirclePosition={setCirclePosition}
          setDarkMode={setDarkMode}
        />
      </div>
    </div>
  );
}
