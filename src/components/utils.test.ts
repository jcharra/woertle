import { getFeedback } from "./utils";
import { Feedback } from "./WordLine";

it("Check feedback for NNMMM on NANNY", () => {
  const fb = getFeedback("NNMMM", "NANNY");
  expect(fb).toEqual([Feedback.CORRECT, Feedback.WRONG_POS, Feedback.WRONG, Feedback.WRONG, Feedback.WRONG]);
});

it("Check feedback for NNNNN on NANNY", () => {
  const fb = getFeedback("NNNNN", "NANNY");
  expect(fb).toEqual([Feedback.CORRECT, Feedback.WRONG, Feedback.CORRECT, Feedback.CORRECT, Feedback.WRONG]);
});

it("Check feedback for XXNNN on NANNY", () => {
  const fb = getFeedback("XXNNN", "NANNY");
  expect(fb).toEqual([Feedback.WRONG, Feedback.WRONG, Feedback.CORRECT, Feedback.CORRECT, Feedback.WRONG_POS]);
});

it("Check feedback for XNNXX on NANNY", () => {
  const fb = getFeedback("XNNXX", "NANNY");
  expect(fb).toEqual([Feedback.WRONG, Feedback.WRONG_POS, Feedback.CORRECT, Feedback.WRONG, Feedback.WRONG]);
});
