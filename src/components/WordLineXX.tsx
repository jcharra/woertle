import { useEffect, useState } from "react";
import { useGameContext, WORD_LENGTH } from "../context/GameContext";
import CharacterBox from "./CharacterBox";
import { getFeedback } from "./utils";

interface WordLineProps {
  rowIndex: number;
}

export enum Feedback {
  CORRECT = "CORRECT",
  WRONG_POS = "WRONG_POS",
  WRONG = "WRONG",
  NONE = "NONE",
}

export default function WordLine(props: WordLineProps) {
  const { rowIndex } = props;
  const { guesses, cursorRow, targetWord } = useGameContext();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const word = guesses[rowIndex] || "";

  console.log("Guesses", guesses, "my word:", word, "at line", rowIndex);

  useEffect(() => {
    if (cursorRow > rowIndex) {
      setFeedback(getFeedback(word, targetWord));
    } else {
      setFeedback(Array(WORD_LENGTH).fill(Feedback.NONE));
    }
  }, [cursorRow, rowIndex, targetWord, word]);

  return (
    <div className="grid grid-cols-5 place-content-center">
      {Array.from(Array(5).keys()).map((idx) => (
        <CharacterBox
          key={`${rowIndex}_${idx}`}
          char={word.charAt(idx) || "_"}
          feedback={feedback[idx] || Feedback.NONE}
        />
      ))}
    </div>
  );
}
