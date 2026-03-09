import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const Card = ({ children = <></>, className = "" }: Props) => {
  return (
    <div
      className={clsx(
        className,
        "w-full h-full rounded-xl border-2 border-gray-400 bg-white flex flex-col items-center justify-evenly",
      )}
    >
      {children}
    </div>
  );
};

export default Card;
