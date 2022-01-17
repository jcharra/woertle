import * as React from "react";
import { useGameContext } from "../context/GameContext";
import WordLine from "./WordLine";

export const MAX_ATTEMPTS = 6;

export default function WordGrid() {
  const { newGame } = useGameContext();

  return (
    <>
      <div>
        {Array.from(Array(MAX_ATTEMPTS).keys()).map((idx) => (
          <WordLine rowIndex={idx} key={"line" + idx}></WordLine>
        ))}
      </div>
    </>
  );
}
