import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { calculatePrecision, PRECISION_UNKNOWN } from "./utils";

function getColor(precision: number) {
  if (precision === PRECISION_UNKNOWN) {
    return "bg-gray-200";
  } else if (precision > 0.9) {
    return "bg-green-600";
  } else if (precision > 0.6) {
    return "bg-yellow-300";
  } else {
    return "bg-red-600";
  }
}

export default function Precision() {
  const { guesses, targetWord } = useGameContext();
  const [precision, setPrecision] = useState<number>(PRECISION_UNKNOWN);

  useEffect(() => {
    const prec = calculatePrecision(guesses, targetWord);
    setPrecision(prec);
  }, [guesses, targetWord]);

  return (
    <div className={`${getColor(precision)} rounded-full shadow-sm py-1`}>
      Präzision: {precision === PRECISION_UNKNOWN ? "-" : (precision * 100).toFixed(1) + "%"}
    </div>
  );
}