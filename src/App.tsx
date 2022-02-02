import React from "react";
import Footer from "./components/Footer";
import GameArea from "./components/GameArea";
import Header from "./components/Header";
import { GameContextProvider } from "./context/GameContext";

export default function App() {
  return (
    <div className="App max-w-6xl m-auto">
      <GameContextProvider>
        <Header />
        <GameArea />
      </GameContextProvider>
      <Footer />
    </div>
  );
}
