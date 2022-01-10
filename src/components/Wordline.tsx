import { useGameContext } from "../context/GameContext";

interface WordLineProps {
  rowIndex: number;
}

const WordLine = (props: WordLineProps) => {
  const { rowIndex } = props;
  const { guessedWords, cursorRow, wordLength } = useGameContext();
  const content = guessedWords[rowIndex];
  const isCommited = cursorRow > rowIndex;

  return (
    <>
      {Array.from(Array(wordLength)).map((idx) => (
        <div className="border border-solid p-2">{content.charAt(idx)}</div>
      ))}
    </>
  );
};

export default WordLine;
