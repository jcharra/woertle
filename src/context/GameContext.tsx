import * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import confetti from "canvas-confetti";
import { TARGETS } from "../data/targets";
import { WORDS } from "../data/words";

export interface Game {
  cursorRow: number;
  targetWord: string;
  guesses: string[];
  processChar: (c: string) => void;
  newGame: (wordlength: number, attemps: number) => void;
  solved: boolean;
  caption: string;
}

export const GameContext = createContext<Game>({
  cursorRow: 0,
  targetWord: "",
  guesses: [],
  processChar: (c: string) => {},
  newGame: (wordlength: number, attemps: number) => {},
  solved: false,
  caption: "",
});

function isAllowedChar(c: string) {
  return /^[a-zA-Z]$/.test(c);
}

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

function randomWord() {
  return TARGETS[Math.floor(Math.random() * TARGETS.length)].toUpperCase();
}

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [cursorRow, setCursorRow] = useState(0);
  const [solved, setSolved] = useState(false);
  const [targetWord, setTargetWord] = useState(randomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [caption, setCaption] = useState("");

  const processChar = useCallback(
    (c: string) => {
      if (cursorRow === MAX_ATTEMPTS || solved) {
        return;
      }

      const word = guesses[cursorRow] || "";

      if (c === "Enter" && word.length === 5) {
        if (WORDS.indexOf(word.toLowerCase()) === -1) {
          setCaption("Das Wort gibt's leider nicht");
          return;
        }

        setCursorRow((cr) => cr + 1);

        if (word === targetWord) {
          setSolved(true);
          return;
        }

        if (cursorRow >= MAX_ATTEMPTS - 1) {
          setCaption("Leider nicht gelöst, der gesuchte Begriff war: " + targetWord.toUpperCase());
          return;
        }
      }

      if ((c === "Delete" || c === "Backspace" || c === "DEL") && word.length > 0) {
        const guessesUpdated = [...guesses];
        guessesUpdated[cursorRow] = word.slice(0, word.length - 1);
        setGuesses(guessesUpdated);
        setCaption("");
        return;
      }

      if (!isAllowedChar(c)) {
        return;
      }

      if (word.length < 5) {
        const guessesUpdated = [...guesses];
        guessesUpdated[cursorRow] = word + c.toUpperCase();
        setGuesses(guessesUpdated);
      } else {
        setCaption("Drücke ENTER um das Wort zu prüfen!");
      }
    },
    [cursorRow, guesses, solved, targetWord]
  );

  const newGame = useCallback(
    (_wordLength: number, _attempts: number) => {
      setGuesses([]);
      setTargetWord(randomWord());
      setCursorRow(0);
      setSolved(false);
      setCaption("");
    },
    [setGuesses, setTargetWord, setCursorRow, setSolved, setCaption]
  );

  React.useEffect(() => {
    if (solved) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [solved]);

  return (
    <GameContext.Provider
      value={{
        cursorRow,
        targetWord,
        guesses,
        processChar,
        newGame,
        solved,
        caption,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  //console.log("Ctx:", ctx);
  return ctx;
}
