import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { COLOR_CORRECT, COLOR_WRONG, COLOR_WRONG_POS } from "./Colors";
import { Feedback } from "./WordLine";

export default function CharacterBox({
  char,
  feedback,
  active,
}: {
  char: string;
  feedback: Feedback;
  active?: boolean;
}) {
  const [background, setBackground] = useState("transparent");
  const { currentGuess, cursorRow, solved } = useGameContext();

  useEffect(() => {
    if (feedback === Feedback.CORRECT) {
      setBackground(COLOR_CORRECT);
    } else if (feedback === Feedback.WRONG) {
      setBackground(COLOR_WRONG);
    } else if (feedback === Feedback.WRONG_POS) {
      setBackground(COLOR_WRONG_POS);
    } else if (active && !solved) {
      setBackground("bg-purple-200");
    } else {
      setBackground("bg-transparent");
    }
  }, [feedback, currentGuess, cursorRow, active, solved]);

  return (
    <div className={`border border-solid p-2 ${background}`}>
      <div className="h-5 text-center font-bold">{char}</div>
    </div>
  );
}
