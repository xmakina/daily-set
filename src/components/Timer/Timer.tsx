import clsx from "clsx";
import { useEffect, useState } from "react";
import HideIcon from "../../pages/HideIcon";
import ShowIcon from "../../pages/ShowIcon";
import format from "format-duration";

type Props = {
  stopped?: boolean;
  onChange: (timer: number) => void;
};

const Timer = ({ stopped = false, onChange = () => {} }: Props) => {
  const [showTimer, setShowTimer] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(function () {
      console.log("interval");
      if (!stopped) {
        setCounter(counter + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter, stopped]);

  useEffect(() => {
    onChange(counter);
  }, [counter, onChange]);

  return (
    <div className="flex justify-center gap-4">
      <div>
        <button className="w-6 h-6" onClick={() => setShowTimer(!showTimer)}>
          {!showTimer && <HideIcon />}
          {showTimer && <ShowIcon />}
        </button>
      </div>
      <div className={clsx("flex-none tabular-nums", { hidden: !showTimer })}>
        {format(counter * 1000)}
      </div>
    </div>
  );
};

export default Timer;
