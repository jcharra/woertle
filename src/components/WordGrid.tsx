import * as React from "react";
import { useEffect, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import WordLine from "./Wordline";

export default function WordGrid(props: any) {
  const { numberOfRows } = useGameContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("keyup", (e) => {
        console.log(`Key "${e.key}" released  [event: keyup]`);
      });
    }
  }, [ref.current]);

  return (
    <div ref={ref}>
      {Array.from(Array(numberOfRows)).map((idx) => (
        <WordLine rowIndex={idx} key={idx}></WordLine>
      ))}
    </div>
  );
}
