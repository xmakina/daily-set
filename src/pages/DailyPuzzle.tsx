import { useEffect, useState } from "react";
import { buildPuzzle } from "set.ts";
import Solutions from "../components/Solutions/Solutions";
import confetti from "canvas-confetti";
import SetGrid, { Status } from "../components/SetGrid/SetGrid";
import ShareResult from "../components/ShareResult/ShareResult";
import Button from "../components/Button/Button";
import clsx from "clsx";
import format from "format-duration";
import HideIcon from "./HideIcon";
import ShowIcon from "./ShowIcon";

type Props = {
  time: number;
  target?: number;
  onClick?: (forward: boolean) => void;
};

const DailyPuzzle = ({ time, target = 6, onClick = () => {} }: Props) => {
  const [puzzle, setPuzzle] = useState(buildPuzzle(12, target, time));
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [highlightSolution, setHighlightSolution] = useState(-1);
  const [solved, setSolved] = useState(false);
  const [status, setStatus] = useState<Status>(Status.guessing);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(format(0));
  const [showTimer, setShowTimer] = useState(false);

  const [guesses, setGuesses] = useState(0);

  useEffect(() => {
    const interval = setInterval(function () {
      if (!solved) {
        setDuration(format(Date.now() - startTime));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [startTime, solved]);

  useEffect(() => {
    setPuzzle(buildPuzzle(12, 6, time));
    setStartTime(Date.now());

    setSolutions([]);
    setHighlightSolution(-1);
    setSolved(false);
  }, [time]);

  useEffect(() => {
    if (solutions.length === target) {
      setSolved(true);
    }
  }, [solutions]);

  useEffect(() => {
    if (solved) {
      return setEndTime(Date.now());
    }

    setEndTime(0);
  }, [solved]);

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

  const onGridClick = () => {
    setHighlightSolution(-1);
    setStatus(Status.guessing);
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
        <div className="flex justify-center gap-4">
          <div>
            <button
              className="w-6 h-6"
              onClick={() => setShowTimer(!showTimer)}
            >
              {!showTimer && <HideIcon />}
              {showTimer && <ShowIcon />}
            </button>
          </div>
          <div
            className={clsx("flex-none tabular-nums", { hidden: !showTimer })}
          >
            {duration}
          </div>
        </div>
      </div>
      {solved && (
        <ShareResult
          guesses={guesses}
          time={time}
          duration={endTime - startTime}
        />
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
        {time < new Date(Date.now()).setHours(0, 0, 0, 0) && (
          <Button onClick={() => onClick(true)}>Tomorrow's Puzzle</Button>
        )}
      </div>
      {/* <button onClick={() => setSolved(true)}>Solve</button> */}
    </div>
  );
};

export default DailyPuzzle;
