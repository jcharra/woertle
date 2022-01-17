import React from "react";

import { GameContextProvider } from "./context/GameContext";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";

export default function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <div className="place-content-center w-full p-5">
          <div className="w-1/2 place-content-center m-auto">
            <WordGrid />
          </div>
          <div className="w-2/3 place-content-center m-auto">
            <Keyboard />
          </div>
          <div className="w-1/2 place-content-center m-auto">
            <NewGameButton />
          </div>
        </div>
      </GameContextProvider>
    </div>
  );
}
