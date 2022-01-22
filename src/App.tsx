import React from "react";
import Caption from "./components/Caption";
import NewGameButton from "./components/NewGameButton";
import WordGrid from "./components/WordGrid";
import { GameContextProvider } from "./context/GameContext";

export default function App() {
  return (
    <div className="App">
      <h1 className="text-center text-xl pt-5">Wörtle</h1>

      <GameContextProvider>
        <div className="place-content-center w-full p-5">
          <div className="w-1/2 place-content-center m-auto">
            <WordGrid />
          </div>
          <div className="h-150 p-5 text-center">
            <Caption />
          </div>
          <div className="py-5 text-center">
            <NewGameButton />
          </div>
        </div>
      </GameContextProvider>

      <div className="py-5 text-center">
        <div>Programmiert von Johannes Charra</div>
        <div>
          inspiriert von{" "}
          <a className="underline" rel="noreferrer" href="https://www.powerlanguage.co.uk/wordle/" target="_blank">
            Wordle
          </a>
        </div>
        <div className="py-5">
          Quellcode auf{" "}
          <a className="underline" rel="noreferrer" href="https://github.com/jcharra/woertle" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
