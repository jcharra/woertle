import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { COLOR_CORRECT, COLOR_KEYBOARD_DEFAULT, COLOR_WRONG, COLOR_WRONG_POS } from "./Colors";
import { getFeedback } from "./utils";
import { Feedback } from "./WordLine";

const keyRows = [
  "QWERTZUIOPÜ".split(""),
  "ASDFGHJKLÖÄ".split(""),
  ["DEL"].concat("YXCVBNMß".split("")).concat(["Enter"]),
];
const keyRowsXs = [
  "ABCDEFG".split(""),
  "HIJKLMN".split(""),
  "OPQRSTU".split(""),
  ["DEL"].concat("VWXYZ".split("")).concat(["Enter"]),
];

const SYMBOLS = new Map<string, string>([["Enter", "⏎"]]);

export default function Keyboard() {
  const { guesses, targetWord, processChar } = useGameContext();
  const [colorMap, setColorMap] = useState(new Map());

  useEffect(() => {
    setColorMap(getColorMap(targetWord, guesses));
  }, [targetWord, guesses]);

  return (
    <>
      <div className="hidden sm:block">
        <KeyboardSmallUp processChar={processChar} colorMap={colorMap} />
      </div>
      <div className="sm:hidden">
        <KeyboardXs processChar={processChar} colorMap={colorMap} />
      </div>
    </>
  );
}

interface KeyboardProps {
  processChar: (c: string) => void;
  colorMap: Map<string, string>;
}

function KeyboardSmallUp(props: KeyboardProps) {
  const { processChar, colorMap } = props;
  return (
    <>
      {keyRows.map((row, index) => {
        return (
          <div className="py-2 place-content-center m-auto" key={"row_" + index}>
            {row.map((c) => {
              const color = colorMap.get(c) || COLOR_KEYBOARD_DEFAULT;
              return (
                <span
                  key={"key_" + c}
                  onClick={() => processChar(c)}
                  className={`${color} mr-1 mx-1 py-2 px-5 md:px-6 font-semibold text-sm text-white rounded-full shadow-md`}
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

const CUSTOM_PADDING = new Map<string, number>([["I", 5]]);
function KeyboardXs(props: KeyboardProps) {
  const { processChar, colorMap } = props;
  return (
    <>
      {keyRowsXs.map((row, index) => {
        return (
          <div className="py-2 place-content-center m-auto" key={"row_" + index}>
            {row.map((c: string) => {
              const color = colorMap.get(c) || "bg-cyan-400";
              return (
                <span
                  key={"key_" + c}
                  onClick={() => processChar(c)}
                  className={`${color} mr-px py-2 px-${
                    CUSTOM_PADDING.get(c) || 4
                  } font-semibold text-sm text-white rounded-full shadow-md`}
                >
                  {SYMBOLS.get(c) || c}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

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
