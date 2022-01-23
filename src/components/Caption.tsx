import { useGameContext } from "../context/GameContext";

export default function Caption() {
  const { caption, cursorRow, currentGuess } = useGameContext();
  return <h1 className="h-8">{cursorRow === 0 && !currentGuess ? "Tippe Deinen ersten Rateversuch" : caption}</h1>;
}
