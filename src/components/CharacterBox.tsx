import { useEffect, useRef } from "react";
import { Feedback } from "./WordLine";

export default function CharacterBox({ char, feedback }: { char: string; feedback: Feedback }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (feedback === Feedback.CORRECT) {
        ref.current.style.background = "lightgreen";
      } else if (feedback === Feedback.WRONG) {
        ref.current.style.background = "gray";
      } else if (feedback === Feedback.WRONG_POS) {
        ref.current.style.background = "yellow";
      }
    }
  }, [feedback]);

  return (
    <div ref={ref} className="border border-solid p-2">
      <div className="w-50 h-50 text-center">{char}</div>
    </div>
  );
}