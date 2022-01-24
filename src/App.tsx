import React from "react";
import Caption from "./components/Caption";
import Keyboard from "./components/Keyboard";
import ModeSwitcher from "./components/ModeSwitcher";
import NewGameButton from "./components/NewGameButton";
import Precision from "./components/Precision";
import Subheading from "./components/Subheading";
import WordGrid from "./components/WordGrid";
import { GameContextProvider } from "./context/GameContext";

export default function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <h1 className="text-center text-3xl pt-5 text-green-400 font-extrabold">~ Wörtle ~</h1>
        <Subheading />

        <ModeSwitcher />
        <div className="place-content-center w-full p-2 sm:p-5">
          <div className="xs:w-3/4 md:w-1/2 place-content-center m-auto">
            <WordGrid />
          </div>
          <div className="h-12 pt-3 text-center">
            <Caption />
          </div>
          <div className="h-12 text-center w-full sm:w-1/4 px-4 sm:px-0 m-auto">
            <Precision />
          </div>
          <div className="text-center">
            <Keyboard />
          </div>
          <div className="pt-5 text-center">
            <NewGameButton />
          </div>
        </div>
      </GameContextProvider>

      <div className="text-center text-xs">
        <div>Programmiert von Johannes Charra</div>
        <div>
          inspiriert von{" "}
          <a className="underline" rel="noreferrer" href="https://www.powerlanguage.co.uk/wordle/" target="_blank">
            Wordle
          </a>
        </div>
        <div className="pt-2">
          Quellcode auf{" "}
          <a className="underline" rel="noreferrer" href="https://github.com/jcharra/woertle" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
