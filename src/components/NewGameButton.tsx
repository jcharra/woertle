import { MAX_ATTEMPTS, useGameContext } from "../context/GameContext";

export default function NewGameButton() {
  const { newGame, solved, cursorRow } = useGameContext();

  const disabled = !solved || cursorRow < MAX_ATTEMPTS;

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
