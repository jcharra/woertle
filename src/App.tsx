import React from "react";

import { GameContextProvider } from "./context/GameContext";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";

export default function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <div className="p-20 grid grid-cols-5 w-1/2 place-content-center">
          <WordGrid />
          <Keyboard />
        </div>
      </GameContextProvider>
    </div>
  );
}
