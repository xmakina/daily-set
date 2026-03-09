import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Button = ({ children, className = "", onClick = () => {} }: Props) => {
  return (
    <button
      className={clsx(className, "bg-gray-800 text-white font-bold py-2 px-4 rounded dark:bg-gray-200 dark:text-black")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
