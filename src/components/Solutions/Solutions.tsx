import { decode, type Card as CardType } from "set.ts/dist/src/model/SetCard";
import Card from "../Card/Card";
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
      className={clsx("flex flex-row gap-2 rounded-2xl", {
        "ring-4 ring-green-500": highlight,
      })}
    >
      {solution && (
        <>
          {solution
            .map((idx) => puzzle[idx])
            .map(decode)
            .map((card) => (
              <div className={clsx("min-w-10 md:w-12 aspect-9/16")}>
                <SetCard
                  shape={card.shape}
                  shading={card.shading}
                  number={card.number}
                  color={card.color}
                />
              </div>
            ))}
        </>
      )}
      {solution === undefined &&
        Array(3).fill(
          <div className="min-w-10 md:w-12 aspect-9/16">
            <Card />
          </div>,
        )}
    </div>
  );
};

const Solutions = ({ puzzle, highlight = -1, solutions, target }: Props) => {
  const display = Array(target)
    .fill([])
    .map((_, idx) => solutions[idx]);

  return (
    <div className="flex flex-col sm:grid lg:flex grid-cols-2 grid-rows-3 gap-2 sm:gap-4">
      {display.map((solution, idx) => (
        <Solution
          puzzle={puzzle}
          solution={solution}
          highlight={highlight === idx}
        />
      ))}
    </div>
  );
};

export default Solutions;
