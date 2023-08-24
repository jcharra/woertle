import { useGameContext } from "../context/GameContext";

export default function ArrowHintToggle() {
  const { kidsMode, arrowsEnabled, toggleArrows } = useGameContext();

  return (
    <div className="text-4xl" onClick={() => toggleArrows()}>
      {kidsMode ? (
        <span className={`${arrowsEnabled ? "text-green-700" : "text-gray-200"} cursor-pointer`}>&#8646;</span>
      ) : (
        ""
      )}
    </div>
  );
}
