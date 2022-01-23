import { WORD_LENGTH } from "../context/GameContext";
import { Feedback } from "./WordLine";

function countChar(c: string, part: string): number {
  return (part.match(new RegExp(c, "g")) || []).length;
}

export function getFeedback(guess: string, actual: string): Feedback[] {
  let fb = [];

  // For the tricky "wrong position" (yellow) case, build a copy of the target
  // word with the positions filtered out where the guess already matches.
  const filteredActual = actual
    .split("")
    .filter((c, idx) => c !== guess[idx])
    .join("");

  // For each letter in the remaining string, track how many yellow
  // feedbacks remain possible, and later decrement this number every
  // time a letter receives yellow.
  let yellowPotential = new Map<string, number>();
  for (const c of filteredActual) {
    yellowPotential.set(c, countChar(c, filteredActual));
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === actual[i]) {
      fb.push(Feedback.CORRECT);
    } else if (actual.indexOf(guess[i]) > -1) {
      const pot = yellowPotential.get(guess[i]) || 0;
      if (pot > 0) {
        // Decrement potential yellow feedback.
        yellowPotential.set(guess[i], pot - 1);
        fb.push(Feedback.WRONG_POS);
      } else {
        fb.push(Feedback.WRONG);
      }
    } else {
      fb.push(Feedback.WRONG);
    }
  }
  return fb;
}

export function calculatePrecision(guesses: string[], targetWord: string): number {
  const knownWrong: string[] = [];
  const knownWrongAtPos = new Map<number, string[]>();
  const knownCorrectAtPos = new Map<number, string>();
  let idealCount = 0;

  for (const guess of guesses) {
    const fb = getFeedback(guess, targetWord);
    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = guess[i];
      if (fb[i] === Feedback.CORRECT) {
        idealCount++;
        continue;
      }

      if (fb[i] === Feedback.WRONG && knownWrong.indexOf(char) === -1) {
        knownWrong.push(char);

        if (!knownCorrectAtPos.get(i)) {
          idealCount++;
        }
      }

      if (fb[i] === Feedback.WRONG_POS && (knownWrongAtPos.get(i) || []).indexOf(char) === -1) {
        const newknownWrongAtPos = (knownWrongAtPos.get(i) || []).concat([char]);
        knownWrongAtPos.set(i, newknownWrongAtPos);
        idealCount++;
      }
    }
  }

  const numberOfChars = guesses.length * WORD_LENGTH;
  return numberOfChars ? idealCount / numberOfChars : PRECISION_UNKNOWN;
}

export const PRECISION_UNKNOWN = -1;
