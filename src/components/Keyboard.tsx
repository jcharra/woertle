import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";

const keyRows = ["QWERTZUIOP".split(""), "ASDFGHJKL".split(""), ["Enter"].concat("YXCVBNM".split("")).concat(["DEL"])];

function getColorMap(targetWord: string, guesses: string[]): Map<string, string> {
  const map = new Map<string, string>();

  return map;
}

export default function Keyboard() {
  const { cursorRow, guesses, targetWord, processChar } = useGameContext();
  const [colorMap, setColorMap] = useState(new Map());

  useEffect(() => {
    setColorMap(getColorMap(targetWord, guesses));
  }, [cursorRow]);

  return (
    <>
      {keyRows.map((row) => {
        return (
          <div className="my-4">
            {row.map((c) => {
              const color = colorMap.get(c) || "bg-cyan-400";
              return (
                <span
                  onClick={() => processChar(c)}
                  className={`${color} mx-1 my-5 px-2 py-2 font-semibold text-sm text-white rounded-full shadow-md`}
                >
                  {c}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
