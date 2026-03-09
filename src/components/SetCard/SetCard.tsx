import type {
  Color,
  NumberValue,
  Shading,
  Shape,
} from "set.ts/dist/src/model/SetCard";

import { clsx } from "clsx";
import "./SetCard.css";
import Card from "../Card/Card";

type Props = {
  shape?: Shape;
  color?: Color;
  number?: NumberValue;
  shading?: Shading;
  reduced?: boolean;
};

const SetCard = ({ color, shading, shape, number, reduced = false }: Props) => {
  return (
    <Card
      className={clsx("aspect-9/16", {
        "min-w-[5vh]": reduced,
        "min-w-[7vh]": !reduced,
      })}
    >
      {shape &&
        Array(number)
          .fill(true)
          .map((_, idx) => (
            <div
              key={idx}
              className={clsx(
                "h-1/4 border-[3px] border-solid border-current",
                shading,
                {
                  "text-red-500": color === "red",
                  "text-green-600": color === "green",
                  "text-purple-600": color === "purple",
                  "aspect-square rounded-full": shape === "circle",
                  "aspect-video rounded-sm": shape === "rectangle",
                  "h-1/5 aspect-square rotate-45": shape === "diamond",
                },
              )}
            >
              &nbsp;
            </div>
          ))}
    </Card>
  );
};

export default SetCard;
