import * as React from "react";
import { useEffect, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import WordLine from "./WordLine";

export default function WordGrid() {
  const { numberOfRows } = useGameContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("keyup", (e) => {
        console.log(`Key "${e.key}" released  [event: keyup]`);
      });
    }
  }, [ref]);

  return (
    <div ref={ref}>
      {Array.from(Array(numberOfRows)).map((idx) => (
        <WordLine rowIndex={idx} key={idx}></WordLine>
      ))}
    </div>
  );
}
