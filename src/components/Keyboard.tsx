import { useGameContext } from "../context/GameContext";

const keyRows = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["DEL", "Y", "X", "C", "V", "B", "N", "M", "Enter"],
];

export default function Keyboard() {
  const { processChar } = useGameContext();
  return (
    <div>
      {keyRows.map((row) => {
        return (
          <div className="place-content-center m-3">
            {row.map((c) => (
              <span className="p-3" onClick={() => processChar(c)}>
                {c}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
