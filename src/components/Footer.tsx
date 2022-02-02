export default function Footer() {
  return (
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
  );
}
