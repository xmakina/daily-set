import { decode, type Card as CardType } from "set.ts/dist/src/model/SetCard";
import SetCard from "../SetCard/SetCard";
import clsx from "clsx";

type Props = {
  puzzle: CardType[];
  highlight?: number;
  solutions: number[][];
  target: number;
};

type SolutionProps = {
  solution?: number[];
  puzzle: CardType[];
  highlight?: boolean;
};

const Solution = ({ solution, puzzle, highlight = false }: SolutionProps) => {
  return (
    <div
      className={clsx(
        "flex flex-row gap-2 rounded-2xl basis-1/3 lg:basis-0 justify-center",
        {
          "ring-4 ring-green-500": highlight,
        },
      )}
    >
      {solution && (
        <>
          {solution
            .map((idx) => puzzle[idx])
            .map(decode)
            .map((card, idx) => (
              <SetCard
                key={idx}
                reduced
                shape={card.shape}
                shading={card.shading}
                number={card.number}
                color={card.color}
              />
            ))}
        </>
      )}
      {solution === undefined &&
        Array(3)
          .fill(true)
          .map((_, idx) => <SetCard key={idx} reduced />)}
    </div>
  );
};

const Solutions = ({ puzzle, highlight = -1, solutions, target }: Props) => {
  const display = Array(target)
    .fill([])
    .map((_, idx) => solutions[idx]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-8">
      {display.map((solution, idx) => (
        <Solution
          key={idx}
          puzzle={puzzle}
          solution={solution}
          highlight={highlight === idx}
        />
      ))}
    </div>
  );
};

export default Solutions;
