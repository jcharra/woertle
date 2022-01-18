import * as React from "react";
import { useRef } from "react";
import { useGameContext } from "../context/GameContext";
import WordLine from "./WordLine";

export const MAX_ATTEMPTS = 6;

export default function WordGrid() {
  const { processChar } = useGameContext();
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const elem = ref.current;
      const listener = (e: KeyboardEvent) => processChar(e.key);
      elem.addEventListener("keyup", listener);
      elem.focus();

      return () => elem.removeEventListener("keyup", listener);
    }
  }, [ref, processChar]);

  return (
    <>
      <div ref={ref} tabIndex={1} className="focus:outline-none">
        {Array.from(Array(MAX_ATTEMPTS).keys()).map((idx) => (
          <WordLine rowIndex={idx} key={"line" + idx}></WordLine>
        ))}
      </div>
    </>
  );
}
