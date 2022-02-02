import { useGameContext } from "../context/GameContext";
import ArrowHintToggle from "./ArrowHintToggle";
import ModeSwitcher from "./ModeSwitcher";

export default function Header() {
  return (
    <div className="max-w-md m-auto flex">
      <div className="flex-1 text-center pt-5">
        <ModeSwitcher />
      </div>
      <div className="grow text-center">
        <h1 className="text-3xl pt-5 text-green-400 font-extrabold">~ Wörtle ~</h1>
        <Subheading />
      </div>
      <div className="flex-1 text-center pt-5">
        <ArrowHintToggle />
      </div>
    </div>
  );
}

function Subheading() {
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
