import { useGameContext } from "../context/GameContext";

export default function NewGameButton() {
  const { newGame } = useGameContext();
  return (
    <div>
      <button
        className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
        onClick={() => newGame(5, 6)}
      >
        Neues Spiel
      </button>
    </div>
  );
}
