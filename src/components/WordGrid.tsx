import * as React from "react";
import WordLine from "./WordLine";

export const MAX_ATTEMPTS = 6;

export default function WordGrid() {
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
