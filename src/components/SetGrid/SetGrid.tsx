import clsx from "clsx";
import { decode, type Card as CardType } from "set.ts/dist/src/model/SetCard";
import SetCard from "../SetCard/SetCard";
import Grid, { type ItemDetails } from "../Grid/Grid";
import { useEffect, type ReactNode } from "react";
import { isSet } from "set.ts";

export const Status = {
  guessing: 0,
  correct: 1,
  wrong: 2,
} as const;

export type Status = (typeof Status)[keyof typeof Status];

type Props = {
  puzzle: CardType[];
  highlighted?: number[];
  onClick?: (cardId: number) => void;
  onCorrect?: (idxA: number, idxB: number, idxC: number) => void;
  onWrong?: (idxA: number, idxB: number, idxC: number) => void;
  status?: Status;
};

const SetGrid = ({
  puzzle,
  onCorrect = () => {},
  onWrong = () => {},
  onClick = () => {},
  status = Status.guessing,
  highlighted = [],
}: Props) => {
  useEffect(() => {
    if (highlighted.length === 3) {
      const cards = highlighted.map((idx) => puzzle[idx]);
      if (isSet(cards[0], cards[1], cards[2])) {
        return onCorrect(highlighted[0], highlighted[1], highlighted[2]);
      } else {
        return onWrong(highlighted[0], highlighted[1], highlighted[2]);
      }
    }
  }, [highlighted, onCorrect, onWrong, puzzle]);

  const board = puzzle
    .map(decode)
    .map<ItemDetails<ReactNode>>(({ shape, color, number, shading }, idx) => ({
      item: (
        <SetCard
          shape={shape}
          color={color}
          number={number}
          shading={shading}
        />
      ),
      highlighted: highlighted.includes(idx),
      className: clsx({
        "ring-red-500": status === Status.wrong,
        "ring-green-500": status === Status.correct,
      }),
    }));

  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center p-2 w-full">
      <Grid
        items={board}
        onClick={onClick}
        className="grid grid-cols-4 grid-rows-3 w-full h-full"
      />
    </div>
  );
};

export default SetGrid;
