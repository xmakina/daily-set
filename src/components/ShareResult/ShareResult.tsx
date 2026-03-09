import Button from "../Button/Button";

type Props = {
  guesses: number;
  time: number;
};

const ShareResult = ({ guesses, time }: Props) => {
  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(time);

  const shareGame = async () => {
    if (navigator.canShare()) {
      await navigator.share({
        title: `I solved the Daily Set in ${guesses} guesses.`,
        text: `I solved the Daily Set for ${date} in ${guesses} guesses. Can you do better?`,
        url: window.location.href,
      });
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(
      `I solved the Daily Set for ${date} in ${guesses} guesses. Can you do better? ${window.location.href}`,
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>You solved the puzzle in {guesses} guesses!</div>
      <div>
        {navigator["share"] && navigator.canShare() && (
          <Button
            className="bg-green-700 hover:bg-green-500 text-white"
            onClick={shareGame}
          >
            Tell your friends!
          </Button>
        )}
        {navigator["clipboard"] && (
          <Button
            className="bg-green-700 hover:bg-green-500 text-white"
            onClick={copyText}
          >
            Tell your friends!
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShareResult;
