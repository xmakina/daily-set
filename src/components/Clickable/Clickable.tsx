import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  highlighted?: boolean;
  className?: string;
};

const Clickable = ({
  highlighted,
  children,
  onClick,
  className = "",
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(className, {
        "ring-4 ring-blue-500": highlighted,
      })}
    >
      {children}
    </div>
  );
};

export default Clickable;
