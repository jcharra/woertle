import { useEffect, useState } from "react";
import { MAX_ATTEMPTS, useGameContext } from "../context/GameContext";

export default function NewGameButton() {
  const { newGame, solved, guesses } = useGameContext();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (solved || guesses.length === MAX_ATTEMPTS) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [solved, guesses]);

  return (
    <div>
      <button
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-200" : "bg-cyan-500"
        } px-4 py-2 font-semibold text-sm text-white rounded-full shadow-sm`}
        onClick={() => {
          newGame(5, 6);
          document.getElementById("grid")?.focus();
        }}
      >
        Neues Spiel
      </button>
    </div>
  );
}
