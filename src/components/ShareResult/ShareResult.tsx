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
  const [shared, setShared] = useState(false);

  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(time);

  const shareData = {
    url: window.location.href,
    text: `I solved the Daily Set for ${date} in ${format(duration)} and ${guesses} guesses. Can you do better? ${window.location.href}`,
  };

  const copyText = () => {
    if (navigator["canShare"] && navigator.canShare(shareData)) {
      navigator.share(shareData);
      setShared(true);
    } else {
      navigator.clipboard.writeText(shareData.text);
      setCopied(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
        You solved the Daily Set in {format(duration)} and {guesses} guesses!
      </div>
      {navigator["share"] && <div></div>}
      {navigator["clipboard"] && (
        <div>
          <Button
            className="bg-green-700 hover:bg-green-500 text-white"
            onClick={copyText}
          >
            {!copied && !shared && "Tell your friends!"}
            {copied && "Copied to your clipboard"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShareResult;
