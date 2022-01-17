import * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { MAX_ATTEMPTS } from "../components/WordGrid";

export interface Game {
  cursorRow: number;
  targetWord: string;
  guesses: string[];
  processChar: (c: string) => void;
  newGame: (wordlength: number, attemps: number) => void;
}

export const GameContext = createContext<Game>({
  cursorRow: 0,
  targetWord: "",
  guesses: [],
  processChar: (c: string) => {},
  newGame: (wordlength: number, attemps: number) => {},
});

function isAllowedChar(c: string) {
  return /^[a-zA-Z]$/.test(c);
}

export const WORD_LENGTH = 5;

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [cursorRow, setCursorRow] = useState(0);
  const [targetWord, setTargetWord] = useState("NANNY");
  const [guesses, setGuesses] = useState<string[]>([]);

  const processChar = useCallback(
    (c: string) => {
      if (cursorRow === MAX_ATTEMPTS) {
        console.log("No more attempts");
        return;
      }

      const word = guesses[cursorRow] || "";

      if (c === "Enter" && word.length === 5) {
        setCursorRow((cr) => cr + 1);
        return;
      }

      if (c === "DEL" && word.length > 0) {
        const guessesUpdated = [...guesses];
        guessesUpdated[cursorRow] = word.slice(0, word.length - 1);
        setGuesses(guessesUpdated);
        return;
      }

      if (!isAllowedChar(c)) {
        console.log("rejected", c);
        return;
      }

      if (word.length < 5) {
        const guessesUpdated = [...guesses];
        guessesUpdated[cursorRow] = word + c;
        setGuesses(guessesUpdated);
      } else {
        console.log("Current is", word, "longer than", 5);
      }
    },
    [cursorRow, guesses]
  );

  const newGame = useCallback((_wordLength: number, _attempts: number) => {
    setGuesses([]);
    setTargetWord("abcde");
    setCursorRow(0);
  }, []);

  return (
    <GameContext.Provider
      value={{
        cursorRow,
        targetWord,
        guesses,
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
