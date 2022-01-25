import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { COLOR_CORRECT, COLOR_WRONG, COLOR_WRONG_POS } from "./Colors";
import { getFeedback } from "./utils";
import { Feedback } from "./WordLine";

const keyRows = ["QWERTZUIOP".split(""), "ASDFGHJKL".split(""), ["DEL"].concat("YXCVBNM".split("")).concat(["Enter"])];

function getColorMap(targetWord: string, guesses: string[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const guess of guesses) {
    const fb = getFeedback(guess, targetWord);

    for (let i = 0; i < guess.length; i++) {
      const charAtPos = guess[i];
      if (fb[i] === Feedback.CORRECT) {
        map.set(charAtPos, COLOR_CORRECT);
      } else if (fb[i] === Feedback.WRONG_POS && map.get(charAtPos) !== COLOR_CORRECT) {
        map.set(charAtPos, COLOR_WRONG_POS);
      } else if (fb[i] === Feedback.WRONG && !map.get(charAtPos)) {
        map.set(charAtPos, COLOR_WRONG);
      }
    }
  }

  return map;
}

const SYMBOLS = new Map<string, string>([
  ["Enter", "⏎"],
  ["DEL", "⌫"],
]);

export default function Keyboard() {
  const { guesses, targetWord, processChar } = useGameContext();
  const [colorMap, setColorMap] = useState(new Map());

  useEffect(() => {
    setColorMap(getColorMap(targetWord, guesses));
  }, [targetWord, guesses]);

  return (
    <>
      {keyRows.map((row, index) => {
        return (
          <div className="py-2 place-content-center m-auto" key={"row_" + index}>
            {
              // Keyboard for SM and larger
            }
            <div className="hidden sm:block">
              {row.map((c) => {
                const color = colorMap.get(c) || "bg-cyan-400";
                return (
                  <span
                    key={"key_" + c}
                    onClick={() => processChar(c)}
                    className={`${color} mr-1 mx-1 py-2 px-6 font-semibold text-sm text-white rounded-full shadow-md`}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
            {
              // XS keyboard
            }
            <div className="sm:hidden">
              {row.map((c) => {
                const color = colorMap.get(c) || "bg-cyan-400";
                return (
                  <span
                    key={"key_" + c}
                    onClick={() => processChar(c)}
                    className={`${color} mr-px sm:mx-1 ${
                      c === "I" ? "px-4" : "px-3"
                    } py-2 sm:px-5 font-semibold text-sm text-white`}
                  >
                    {SYMBOLS.get(c) || c}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
