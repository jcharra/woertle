import { useGameContext } from "../context/GameContext";

export default function Caption() {
  const { caption } = useGameContext();
  return <h1>{caption}</h1>;
}
