import { useGameContext } from "../context/GameContext";

export default function NewGameButton() {
  const { newGame } = useGameContext();
  return (
    <div>
      <button className="rounded-full" onClick={() => newGame(5, 6)}>
        Neues Spiel
      </button>
    </div>
  );
}
