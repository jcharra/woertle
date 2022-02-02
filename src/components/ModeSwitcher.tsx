import { useEffect } from "react";
import { MAX_ATTEMPTS, useGameContext, WORD_LENGTH } from "../context/GameContext";

export default function ModeSwitcher() {
  const { kidsMode, toggleKidsMode, newGame } = useGameContext();

  useEffect(() => {
    newGame(WORD_LENGTH, MAX_ATTEMPTS + 1);
  }, [kidsMode, newGame]);

  return (
    <>
      <div className="text-3xl" onClick={() => toggleKidsMode()}>
        {kidsMode ? "🧒🏼" : "🧑🏼"}
      </div>
    </>
  );
}
