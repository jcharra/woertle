import { useEffect } from "react";
import { MAX_ATTEMPTS, useGameContext, WORD_LENGTH } from "../context/GameContext";

export default function ModeSwitcher() {
  const { kidsMode, toggleKidsMode, arrowsEnabled, toggleArrows, newGame } = useGameContext();

  useEffect(() => {
    newGame(WORD_LENGTH, MAX_ATTEMPTS + 1);
  }, [kidsMode, newGame]);

  return (
    <>
      <div className="text-3xl fixed top-5 left-5 md:left-48 lg:left-96" onClick={() => toggleKidsMode()}>
        {kidsMode ? "🧒🏼" : "🧑🏼"}
      </div>
      <div className="text-4xl fixed top-5 right-5 md:right-48 lg:right-96" onClick={() => toggleArrows()}>
        {kidsMode ? <span className={`${arrowsEnabled ? "text-green-700" : "text-gray-200"}`}>&#8646;</span> : ""}
      </div>
    </>
  );
}
