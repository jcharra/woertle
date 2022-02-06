import { render, screen } from "@testing-library/react";
import { DEFAULT_CONTEXT, GameContext, MAX_ATTEMPTS } from "../context/GameContext";
import NewGameButton from "./NewGameButton";

it("should be disabled by default", async () => {
  render(<NewGameButton />);

  const button = await screen.findByTestId("newgame-button");
  expect(button).toBeDisabled();
  expect(button).toHaveTextContent("Neues Spiel");
});

it("should get enabled if solved", async () => {
  const context = { ...DEFAULT_CONTEXT, solved: true };

  render(
    <GameContext.Provider value={context}>
      <NewGameButton />
    </GameContext.Provider>
  );

  const button = await screen.findByTestId("newgame-button");
  expect(button).toBeEnabled();
});

it("should get enabled if game over", async () => {
  const wrongGuesses = [];
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    wrongGuesses.push("WRONG");
  }

  const context = { ...DEFAULT_CONTEXT, guesses: wrongGuesses };

  render(
    <GameContext.Provider value={context}>
      <NewGameButton />
    </GameContext.Provider>
  );

  const button = await screen.findByTestId("newgame-button");
  expect(button).toBeEnabled();
});
