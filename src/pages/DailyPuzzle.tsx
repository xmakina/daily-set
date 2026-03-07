import { useEffect, useState } from "react";
import { buildPuzzle, isSet } from "set.ts";
import Grid, { Status } from "../components/Grid/Grid";
import Solutions from "../components/Solutions/Solutions";

type Props = {
  date: Date;
  target?: number;
};

const DailyPuzzle = ({ date, target = 6 }: Props) => {
  const [time, setTime] = useState(date.setHours(0, 0, 0, 0));
  const [puzzle, setPuzzle] = useState(buildPuzzle(12, target, time));
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>(Status.guessing);
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [highlightSolution, setHighlightSolution] = useState(-1);
  const [clearNext, setClearNext] = useState(false);

  const advanceTime = (forward: boolean) => {
    const advance = 1000 * 60 * 60 * 24 * (forward ? 1 : -1);
    setTime(new Date(time + advance).getTime());
  };

  useEffect(() => {
    setPuzzle(buildPuzzle(12, 6, time));
  }, [time]);

  const handleClick = (cardId: number) => {
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

  return (
    <div className="flex flex-col gap-4 justify-center w-screen px-8">
      <div className="flex text-3xl justify-center">Today's Puzzle</div>
      <div className="flex justify-center">
        {new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
        }).format(date)}
      </div>
      <div className="flex flex-row gap-7 justify-center align-middle items-center">
        <Solutions
          solutions={solutions}
          highlight={highlightSolution}
          puzzle={puzzle}
          target={target}
        />
        <Grid
          puzzle={puzzle}
          highlighted={highlighted}
          onClick={handleClick}
          status={status}
        />
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <button onClick={() => advanceTime(false)}>Yesterday's Puzzle</button>
        <button onClick={() => advanceTime(true)}>Tomorrow's Puzzle</button>
      </div>
    </div>
  );
};

export default DailyPuzzle;
