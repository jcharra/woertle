import { useEffect, useState } from "react";
import { useGameContext, WORD_LENGTH } from "../context/GameContext";
import {
  COLOR_ACTIVE,
  COLOR_CORRECT,
  COLOR_WRONG,
  COLOR_WRONG_POS,
  TEXT_WRONG_POS_INVISIBLE,
  TEXT_WRONG_POS_VISIBLE,
} from "./Colors";
import { Feedback } from "./WordLine";

function hasUnfoundOccurrencesLeft(char: string, index: number, targetWord: string, feedback: Feedback[]) {
  for (let i = 0; i < index; i++) {
    if (targetWord[i] === char && feedback[i] !== Feedback.CORRECT) {
      return true;
    }
  }
  return false;
}

function hasUnfoundOccurrencesRight(char: string, index: number, targetWord: string, feedback: Feedback[]) {
  for (let i = WORD_LENGTH; i > index; i--) {
    if (targetWord[i] === char && feedback[i] !== Feedback.CORRECT) {
      return true;
    }
  }
  return false;
}

export default function CharacterBox({
  char,
  feedback,
  active,
  index,
}: {
  char: string;
  feedback: Feedback[];
  active?: boolean;
  index: number;
}) {
  const [background, setBackground] = useState("transparent");
  const [content, setContent] = useState<string | JSX.Element>(char);
  const { currentGuess, cursorRow, solved, targetWord, arrowsEnabled } = useGameContext();

  useEffect(() => {
    setContent(char);
    if (feedback[index] === Feedback.CORRECT) {
      setBackground(COLOR_CORRECT);
    } else if (feedback[index] === Feedback.WRONG) {
      setBackground(COLOR_WRONG);
    } else if (feedback[index] === Feedback.WRONG_POS) {
      setBackground(COLOR_WRONG_POS);

      if (arrowsEnabled) {
        const leftArrow = hasUnfoundOccurrencesLeft(char, index, targetWord, feedback);
        const rightArrow = hasUnfoundOccurrencesRight(char, index, targetWord, feedback);
        setContent(<CharWithArrows char={char} left={leftArrow} right={rightArrow} />);
      } else {
        setContent(char);
      }
    } else if (active && !solved) {
      setBackground(COLOR_ACTIVE);
    } else {
      setBackground("bg-transparent");
    }
  }, [feedback, currentGuess, cursorRow, active, solved, targetWord, char, index, arrowsEnabled]);

  return (
    <div className={`border border-solid p-2 ${background}`}>
      <div className="h-5 text-center font-bold">{content}</div>
    </div>
  );
}

function CharWithArrows({ char, left, right }: { char: string; left: boolean; right: boolean }) {
  return (
    <>
      <span className={`mr-1 inline-block ${left ? TEXT_WRONG_POS_VISIBLE : TEXT_WRONG_POS_INVISIBLE}`}>&#8592;</span>
      {char}
      <span className={`ml-1 inline-block ${right ? TEXT_WRONG_POS_VISIBLE : TEXT_WRONG_POS_INVISIBLE}`}>&#8594;</span>
    </>
  );
}
