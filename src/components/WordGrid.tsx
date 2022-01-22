import * as React from "react";
import { MAX_ATTEMPTS, useGameContext } from "../context/GameContext";
import WordLine from "./WordLine";

export default function WordGrid() {
  const { processChar } = useGameContext();

  React.useEffect(() => {
    console.log("Add listener");
    const listener = (e: KeyboardEvent) => processChar(e.key);
    window.addEventListener("keyup", listener);

    return () => {
      console.log("Remove listener");
      window.removeEventListener("keyup", listener);
    };
  }, [processChar]);

  return (
    <>
      <div id="grid" tabIndex={0} className="focus:outline-0">
        {Array.from(Array(MAX_ATTEMPTS).keys()).map((idx) => (
          <WordLine rowIndex={idx} key={"line" + idx}></WordLine>
        ))}
      </div>
    </>
  );
}
