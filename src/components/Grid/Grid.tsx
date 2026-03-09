import clsx from "clsx";
import { decode, type Card as CardType } from "set.ts/dist/src/model/SetCard";
import Clickable from "../Clickable/Clickable";
import SetCard from "../SetCard/SetCard";

export const Status = {
  guessing: 0,
  correct: 1,
  wrong: 2,
} as const;

export type Status = (typeof Status)[keyof typeof Status];

type Props = {
  puzzle: CardType[];
  highlighted: number[];
  onClick: (cardId: number) => void;
  status: Status;
};

const Grid = ({ puzzle, highlighted, onClick, status }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center lg:grid grid-cols-4 grid-rows-3">
      {puzzle.map(decode).map((card, idx) => (
        <Clickable
          onClick={() => onClick(idx)}
          highlighted={highlighted.indexOf(idx) !== -1}
          className={clsx("rounded-xl min-w-12 md:w-24 basis-1/5 aspect-9/16", {
            "ring-red-500": status === Status.wrong,
            "ring-green-500": status === Status.correct,
          })}
        >
          <SetCard
            shape={card.shape}
            shading={card.shading}
            number={card.number}
            color={card.color}
          />
        </Clickable>
      ))}
    </div>
  );
};

export default Grid;
