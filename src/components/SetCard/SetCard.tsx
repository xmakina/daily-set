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
  shape: Shape;
  color: Color;
  number: NumberValue;
  shading: Shading;
};

const SetCard = ({ color, shading, shape, number }: Props) => {
  return (
    <Card>
      {Array(number).fill(
        <div
          className={clsx("shape w-14 h-6", shape, shading, {
            "text-red-500": color === "red",
            "text-green-600": color === "green",
            "text-purple-600": color === "purple",
          })}
        ></div>,
      )}
    </Card>
  );
};

export default SetCard;
