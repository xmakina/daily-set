import Button from "../Button/Button";

type Props = {
  guesses: number;
  time: number;
};

const hasNavigator = () => Object.keys(navigator).length  > 0

const ShareResult = ({ guesses, time }: Props) => {
  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(time);

  const onShare = async () => {
    if (navigator.canShare()) {
      await navigator.share({
        title: `I solved the Daily Set in ${guesses} guesses.`,
        text: `I solved the Daily Set for ${date} in ${guesses} guesses. Can you do better?`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>You solved the puzzle in {guesses} guesses!</div>
      {hasNavigator() && navigator.canShare() && (
        <div>
          <Button
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={onShare}
          >
            Tell your friends!
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShareResult;
