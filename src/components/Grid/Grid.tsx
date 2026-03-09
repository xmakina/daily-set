import clsx from "clsx";
import Clickable from "../Clickable/Clickable";
import type { ReactNode } from "react";

export type ItemDetails<T> = {
  item: T;
  highlighted?: boolean;
  className?: string;
};

type Props<T> = {
  items: ItemDetails<T>[];
  onClick?: (cardId: number) => void;
  className?: string;
};

const Grid = <T extends ReactNode>({
  items,
  onClick = () => {},
  className = "",
}: Props<T>) => {
  return (
    <div
      className={clsx(
        "flex flex-row flex-wrap gap-4 items-center justify-center",
        className,
      )}
    >
      {items.map(({ item, highlighted, className }, key) => (
        <Clickable
          key={key}
          onClick={() => onClick(key)}
          highlighted={highlighted}
          className={className}
        >
          {item}
        </Clickable>
      ))}
    </div>
  );
};

export default Grid;
