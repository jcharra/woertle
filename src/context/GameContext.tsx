import * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import confetti from "canvas-confetti";
import { TARGETS } from "../data/targets";
import { WORDS } from "../data/words";

export interface Game {
  cursorRow: number;
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  processChar: (c: string) => void;
  newGame: (wordlength: number, attemps: number) => void;
  solved: boolean;
  caption: string;
}

export const GameContext = createContext<Game>({
  cursorRow: 0,
  targetWord: "",
  guesses: [],
  currentGuess: "",
  processChar: (c: string) => {},
  newGame: (wordlength: number, attemps: number) => {},
  solved: false,
  caption: "",
});

function isAllowedChar(c: string) {
  return /^[a-zA-Z]$/.test(c);
}

const EVAL = new Map<number, string>([
  [0, "Wahnsinn 😲"],
  [1, "Unglaublich 🤩"],
  [2, "Hervorragend 🥳"],
  [3, "Klasse 👍🏻"],
  [4, "Gut gemacht! 😊"],
  [5, "Knappe Kiste 😅"],
]);

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
  const [currentGuess, setCurrentGuess] = useState("");
  const [caption, setCaption] = useState("");

  const processChar = useCallback(
    (c: string) => {
      if (cursorRow === MAX_ATTEMPTS || solved) {
        return;
      }

      if (c === "Enter" && currentGuess.length === 5) {
        if (TARGETS.indexOf(currentGuess.toLowerCase()) === -1 && WORDS.indexOf(currentGuess.toLowerCase()) === -1) {
          setCaption("Das Wort gibt's leider nicht");
          return;
        }

        if (currentGuess === targetWord) {
          setSolved(true);
          setCaption(EVAL.get(cursorRow) || "Gut gemacht");
        } else if (cursorRow >= MAX_ATTEMPTS - 1) {
          setCaption("Leider nicht gelöst, gesucht war " + targetWord.toUpperCase());
        }

        const guessesUpdated = [...guesses];
        guessesUpdated.push(currentGuess);
        setGuesses(guessesUpdated);
        setCurrentGuess("");
        setCursorRow((cr) => cr + 1);
      }

      if ((c === "Delete" || c === "Backspace" || c === "DEL") && currentGuess.length > 0) {
        setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
        setCaption("");
        return;
      }

      if (!isAllowedChar(c)) {
        return;
      }

      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + c.toUpperCase());
      } else {
        setCaption("Drücke ENTER um das Wort zu prüfen!");
      }
    },
    [cursorRow, guesses, currentGuess, solved, targetWord]
  );

  const newGame = useCallback(
    (_wordLength: number, _attempts: number) => {
      setCurrentGuess("");
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
        currentGuess,
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
