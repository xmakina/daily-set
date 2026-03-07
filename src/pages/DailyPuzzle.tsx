import { useEffect, useState } from "react";
import { buildPuzzle, isSet } from "set.ts";
import Grid, { Status } from "../components/Grid/Grid";
import Solutions from "../components/Solutions/Solutions";
import clsx from "clsx";
import confetti from "canvas-confetti";

type Props = {
  time: number;
  target?: number;
  onClick?: () => void;
};

const DailyPuzzle = ({ time, target = 6, onClick = () => {} }: Props) => {
  const [puzzle, setPuzzle] = useState(buildPuzzle(12, target, time));
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>(Status.guessing);
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [highlightSolution, setHighlightSolution] = useState(-1);
  const [clearNext, setClearNext] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setPuzzle(buildPuzzle(12, 6, time));
  }, [time]);

  const handleClick = (cardId: number) => {
    if (solved) {
      return;
    }

    if (clearNext) {
      setClearNext(false);
      return setHighlighted([cardId]);
    }

    const inList = highlighted.indexOf(cardId);
    if (inList > -1) {
      return setHighlighted([
        ...highlighted.slice(0, inList),
        ...highlighted.slice(inList + 1),
      ]);
    }
    return setHighlighted([...highlighted, cardId]);
  };

  useEffect(() => {
    if (highlighted.length === 3) {
      const cards = highlighted.map((idx) => puzzle[idx]);
      if (isSet(cards[0], cards[1], cards[2])) {
        const existingSolution = solutions.findIndex(
          (solution) =>
            solution.includes(highlighted[0]) &&
            solution.includes(highlighted[1]) &&
            solution.includes(highlighted[2]),
        );

        if (existingSolution !== -1) {
          setHighlightSolution(existingSolution);
        } else {
          setSolutions([...solutions, [...highlighted]]);
          setClearNext(true);
        }

        return setStatus(Status.correct);
      } else {
        return setStatus(Status.wrong);
      }
    }

    setHighlightSolution(-1);
    return setStatus(Status.guessing);
  }, [highlighted]);

  useEffect(() => {
    if (solutions.length === 6) {
      setSolved(true);
      setHighlightSolution(-1);
      setHighlighted([]);
      confetti();
      setTimeout(confetti, 500);
      setTimeout(confetti, 1000);
    }
  }, [solutions]);

  return (
    <div className="flex flex-col gap-4 justify-center w-screen px-8">
      <div className="flex text-3xl justify-center">Today's Puzzle</div>
      <div className="flex justify-center">
        {new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
        }).format(time)}
      </div>
      <div className="flex flex-col lg:flex-row-reverse gap-7 justify-center align-middle items-center">
        <div className="">
          <Grid
            puzzle={puzzle}
            highlighted={highlighted}
            onClick={handleClick}
            status={status}
          />
        </div>
        <div className="pr-2">
          <Solutions
            solutions={solutions}
            highlight={highlightSolution}
            puzzle={puzzle}
            target={target}
          />
        </div>
      </div>
      <div
        className={clsx("flex-row gap-4 justify-center", {
          flex: solved,
          hidden: !solved,
        })}
      >
        <button onClick={onClick}>Yesterday's Puzzle</button>
      </div>
    </div>
  );
};

export default DailyPuzzle;
