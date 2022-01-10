import * as React from "react";
import { createContext, useContext, useState } from "react";

export interface Game {
  wordLength: number;
  numberOfRows: number;
  cursorRow: number;
  cursorColumn: number;
  targetWord: string;
  guessedWords: string[];
  processChar: (c: string) => void;
  newGame: (wordlength: number, attemps: number) => void;
}

export const GameContext = createContext<Game>({
  wordLength: 0,
  numberOfRows: 0,
  cursorRow: 0,
  cursorColumn: 0,
  targetWord: "",
  guessedWords: [],
  processChar: (c: string) => {},
  newGame: (wordlength: number, attemps: number) => {},
});

function isAllowedChar(c: string) {
  return /[a-zA-Z]/.test(c);
}

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wordLength, setWordLength] = useState(0);
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [cursorRow, setCursorRow] = useState(0);
  const [cursorColumn, setCursorColumn] = useState(0);
  const [targetWord, setTargetWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);

  function processChar(c: string) {
    console.log("Received", c);
    if (!isAllowedChar(c)) {
      console.log("rejected");
      return;
    }

    const wordsUpdated = [...guessedWords];
    const currentWord = wordsUpdated[cursorRow] || "";
    if (currentWord.length < wordLength) {
      wordsUpdated[cursorRow] = wordsUpdated[cursorRow] + c;
      setGuessedWords(wordsUpdated);
    }
  }

  function newGame(_wordLength: number, _attempts: number) {
    setWordLength(_wordLength);
    setNumberOfRows(_attempts);
    setGuessedWords([]);
    setTargetWord("abcde");
    setCursorRow(0);
    setCursorColumn(0);
  }

  return (
    <GameContext.Provider
      value={{
        wordLength,
        numberOfRows,
        cursorRow,
        cursorColumn,
        targetWord,
        guessedWords,
        processChar,
        newGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
