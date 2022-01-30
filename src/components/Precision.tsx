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
  const { guesses, targetWord, kidsMode } = useGameContext();
  const [precision, setPrecision] = useState<number>(PRECISION_UNKNOWN);

  useEffect(() => {
    const prec = calculatePrecision(guesses, targetWord);
    setPrecision(prec);
  }, [guesses, targetWord]);

  if (kidsMode) {
    return null;
  }

  return (
    <div className="h-12 text-center w-2/3 sm:w-1/4 px-4 sm:px-0 m-auto">
      <div className={`${getColor(precision)} rounded-full shadow-sm py-1`}>
        Präzision: {precision === PRECISION_UNKNOWN ? "-" : (precision * 100).toFixed(1) + "%"}
      </div>
    </div>
  );
}
