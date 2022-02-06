import Caption from "./Caption";
import Keyboard from "./Keyboard";
import NewGameButton from "./NewGameButton";
import Precision from "./Precision";
import WordGrid from "./WordGrid";

export default function GameArea() {
  return (
    <div className="place-content-center w-full p-2 sm:p-5" data-testid="game-area">
      <div className="xs:w-3/4 md:w-1/2 place-content-center m-auto">
        <WordGrid />
      </div>
      <div className="h-12 pt-3 text-center">
        <Caption />
      </div>
      <Precision />
      <div className="text-center">
        <Keyboard />
      </div>
      <div className="pb-2 pt-3 text-center">
        <NewGameButton />
      </div>
    </div>
  );
}
