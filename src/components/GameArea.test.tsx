import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameContextProvider, MAX_ATTEMPTS } from "../context/GameContext";
import { COLOR_ACTIVE } from "./Colors";
import GameArea from "./GameArea";

describe("Check several game scenarios", () => {
  it("Show ENTER hint if too many chars typed", async () => {
    render(
      <GameContextProvider>
        <GameArea />
      </GameContextProvider>
    );

    for (let i = 0; i < MAX_ATTEMPTS + 1; i++) {
      userEvent.type(await screen.findByTestId("game-area"), "e");
    }

    const caption = await screen.findByTestId("caption");

    expect(caption).toHaveTextContent("Drücke ENTER um das Wort zu prüfen!");
  });

  it("Change row after submit", async () => {
    render(
      <GameContextProvider>
        <GameArea />
      </GameContextProvider>
    );

    userEvent.type(await screen.findByTestId("game-area"), "K");
    userEvent.type(await screen.findByTestId("game-area"), "A");
    userEvent.type(await screen.findByTestId("game-area"), "T");
    userEvent.type(await screen.findByTestId("game-area"), "Z");
    userEvent.type(await screen.findByTestId("game-area"), "E");

    const secondlineBeforeSubmit = await screen.findByTestId("wordline-1");
    expect(secondlineBeforeSubmit.getElementsByClassName(COLOR_ACTIVE).length).toEqual(0);

    fireEvent(
      await screen.getByTestId("keyboard-key-enter"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    const secondlineAfterSubmit = await screen.findByTestId("wordline-1");
    expect(secondlineAfterSubmit.getElementsByClassName(COLOR_ACTIVE).length).toEqual(1);
  });
});
