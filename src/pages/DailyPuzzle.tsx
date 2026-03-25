import { useEffect, useState } from "react";
import { buildPuzzle } from "set.ts";
import Solutions from "../components/Solutions/Solutions";
import confetti from "canvas-confetti";
import SetGrid, { Status } from "../components/SetGrid/SetGrid";
import ShareResult from "../components/ShareResult/ShareResult";
import Button from "../components/Button/Button";
import clsx from "clsx";
import Timer from "../components/Timer/Timer";

type Props = {
  time: number;
  today: number;
  target?: number;
  onClick?: (forward: boolean) => void;
};

const DailyPuzzle = ({
  time = new Date().setHours(0, 0, 0),
  today = new Date().getTime(),
  target = 6,
  onClick = () => {},
}: Props) => {
  const [puzzle, setPuzzle] = useState(buildPuzzle(12, target, time));
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [highlightSolution, setHighlightSolution] = useState(-1);
  const [solved, setSolved] = useState(false);
  const [status, setStatus] = useState<Status>(Status.guessing);
  const [duration, setDuration] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [highlighted, setHighlighted] = useState<number[]>([]);

  useEffect(() => {
    setPuzzle(buildPuzzle(12, 6, time));
    setHighlighted([]);

    setSolutions([]);
    setHighlightSolution(-1);
    setSolved(false);
    setDuration(0);
  }, [time]);

  useEffect(() => {
    if (solutions.length === target) {
      setSolved(true);
    }
  }, [solutions, target]);

  useEffect(() => {
    if (!solved) {
      return;
    }

    confetti({ origin: { x: 0.6, y: 0.9 } });
    setTimeout(() => confetti({ origin: { x: 0.3, y: 0.9 } }), 500);
    setTimeout(confetti, 1000);
  }, [solved]);

  const onCorrect = (a: number, b: number, c: number) => {
    setGuesses(guesses + 1);
    const existingSolution = solutions.findIndex(
      (solution) =>
        solution.includes(a) && solution.includes(b) && solution.includes(c),
    );

    if (existingSolution !== -1) {
      setHighlightSolution(existingSolution);
    } else {
      setSolutions([...solutions, [...[a, b, c]]]);
    }

    setStatus(Status.correct);
  };

  const onWrong = () => {
    setGuesses(guesses + 1);
    setStatus(Status.wrong);
  };

  const onGridClick = (cardId: number) => {
    setHighlightSolution(-1);

    if (solved) {
      return;
    }

    const inList = highlighted.indexOf(cardId);
    if (inList > -1) {
      return setHighlighted([
        ...highlighted.slice(0, inList),
        ...highlighted.slice(inList + 1),
      ]);
    }

    if (highlighted.length === 3) {
      return setHighlighted([cardId]);
    }

    setStatus(Status.guessing);
    return setHighlighted([...highlighted, cardId]);
  };

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <div className="flex text-3xl justify-center">Daily Set Puzzle</div>
      <div className="flex flex-row gap-4 justify-center">
        <div>
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
          }).format(time)}
        </div>
        <Timer onChange={setDuration} stopped={solved} starting={duration} />
      </div>
      {solved && (
        <ShareResult guesses={guesses} time={time} duration={duration} />
      )}
      <div className="flex flex-col gap-7 lg:gap-14 justify-center align-middle items-center lg:flex-row">
        {!solved && (
          <div className="flex w-full max-w-[60vh]">
            <SetGrid
              puzzle={puzzle}
              onCorrect={onCorrect}
              onWrong={onWrong}
              onClick={onGridClick}
              status={status}
              highlighted={highlighted}
            />
          </div>
        )}
        <div className={clsx("flex", { "basis-1/6": !solved })}>
          <Solutions
            solutions={solutions}
            highlight={highlightSolution}
            puzzle={puzzle}
            target={target}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <Button onClick={() => onClick(false)}>Yesterday's Puzzle</Button>
        {time < new Date(today).setHours(0, 0, 0, 0) && (
          <Button onClick={() => onClick(true)}>Tomorrow's Puzzle</Button>
        )}
      </div>
      {/* <button onClick={() => setSolved(true)}>Solve</button> */}
    </div>
  );
};

export default DailyPuzzle;
