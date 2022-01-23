import { useGameContext } from "../context/GameContext";

export default function Subheading() {
  const { kidsMode } = useGameContext();

  if (!kidsMode) {
    return null;
  }

  return (
    <div className="w-full text-center">
      <span className="text-red-600">J</span>
      <span className="text-yellow-300">U</span>
      <span className="text-blue-600">N</span>
      <span className="text-green-600">I</span>
      <span className="text-purple-600">O</span>
      <span className="text-yellow-600">R</span>
    </div>
  );
}
