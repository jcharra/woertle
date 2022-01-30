import * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import confetti from "canvas-confetti";
import { TARGETS } from "../data/targets";
import { WORDS } from "../data/words";
import { KIDS_WORDS } from "../data/kidsWords";

export interface Game {
  cursorRow: number;
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  processChar: (c: string) => void;
  newGame: (wordlength: number, attemps: number) => void;
  solved: boolean;
  caption: string;
  kidsMode: boolean;
  toggleKidsMode: () => void;
  arrowsEnabled: boolean;
  toggleArrows: () => void;
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
  kidsMode: false,
  toggleKidsMode: () => {},
  arrowsEnabled: false,
  toggleArrows: () => {},
});

function isAllowedChar(c: string) {
  return /^[a-zA-Z]$/.test(c);
}

const EVAL = new Map<number, string>([
  [0, "Wahnsinn 😲 Kannst Du hellsehen? 👁️"],
  [1, "Unglaublich gut 🤩"],
  [2, "Hervorragend 🥳"],
  [3, "Klasse 👍🏻"],
  [4, "Gut gemacht! 😊"],
  [5, "Knappe Kiste 😅"],
]);

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

function randomWord(isKidsMode: boolean) {
  const wordSet = isKidsMode ? KIDS_WORDS : TARGETS;
  return wordSet[Math.floor(Math.random() * wordSet.length)].toUpperCase();
}

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const [cursorRow, setCursorRow] = useState(0);
  const [solved, setSolved] = useState(false);
  const [targetWord, setTargetWord] = useState(randomWord(false));
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [caption, setCaption] = useState("");
  const [kidsMode, setKidsMode] = useState(false);
  const [arrowsEnabled, setArrowsEnabled] = useState(false);

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
        } else if (currentGuess.toLowerCase() === "penis") {
          setCaption(kidsMode ? "Und das im Kindermodus ... 🙄" : "Nein, ich glaube nicht.");
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
    [cursorRow, guesses, currentGuess, solved, targetWord, kidsMode]
  );

  const newGame = useCallback(
    (_wordLength: number, _attempts: number) => {
      setCurrentGuess("");
      setGuesses([]);
      setTargetWord(randomWord(kidsMode));
      setCursorRow(0);
      setSolved(false);
      setCaption("");
    },
    [setGuesses, setTargetWord, setCursorRow, setSolved, setCaption, kidsMode]
  );

  const toggleKidsMode = useCallback(() => {
    setArrowsEnabled(!kidsMode); // current value, thus negated!
    setKidsMode(!kidsMode);
  }, [kidsMode, setKidsMode, setArrowsEnabled]);

  const toggleArrows = useCallback(() => {
    setArrowsEnabled(!arrowsEnabled);
  }, [arrowsEnabled, setArrowsEnabled]);

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
        kidsMode,
        toggleKidsMode,
        arrowsEnabled,
        toggleArrows,
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
