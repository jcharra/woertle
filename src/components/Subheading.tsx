import { useGameContext } from "../context/GameContext";

export default function Subheading() {
  const { kidsMode } = useGameContext();

  if (!kidsMode) {
    return null;
  }

  return (
    <div className="w-full text-center font-bold">
      <span className="text-red-600 mr-1">J</span>
      <span className="text-yellow-300 mr-1">U</span>
      <span className="text-blue-600 mr-1">N</span>
      <span className="text-green-600 mr-1">I</span>
      <span className="text-purple-600 mr-1">O</span>
      <span className="text-yellow-600 mr-1">R</span>
    </div>
  );
}
