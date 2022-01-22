import { useGameContext } from "../context/GameContext";

export default function Caption() {
  const { caption } = useGameContext();
  return <h1 className="h-8">{caption}</h1>;
}
