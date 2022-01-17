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
