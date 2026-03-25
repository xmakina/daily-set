import { useState } from "react";
import Button from "../Button/Button";
import format from "format-duration";

type Props = {
  guesses: number;
  time: number;
  duration: number;
};

const ShareResult = ({ guesses, time, duration }: Props) => {
  const [copied, setCopied] = useState(false);

  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(time);

  const copyText = () => {
    navigator.clipboard.writeText(
      `I solved the Daily Set for ${date} in ${format(duration)} and ${guesses} guesses. Can you do better? ${window.location.href}`,
    );
    setCopied(true);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
        You solved the Daily Set in {format(duration)} and {guesses} guesses!
      </div>
      {navigator["clipboard"] && (
        <div>
          <Button
            className="bg-green-700 hover:bg-green-500 text-white"
            onClick={copyText}
          >
            {!copied && "Tell your friends!"}
            {copied && "Copied to your clipboard"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShareResult;
