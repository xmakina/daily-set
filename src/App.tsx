import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DailyPuzzle from "./pages/DailyPuzzle";
import { useState } from "react";

const getNow = () => Date.now();

function App() {
  const [time, setTime] = useState(new Date(getNow()).setHours(0, 0, 0, 0));

  const advanceTime = (forward: boolean) => {
    const advance = 1000 * 60 * 60 * 24 * (forward ? 1 : -1);
    setTime(new Date(time + advance).getTime());
  };

  return (
    <div className="flex flex-col items-center px-8 dark:bg-black bg-white dark:text-white pb-8 pt-2 min-h-screen min-w-screen">
      <div className="max-w-7xl w-full">
        <BrowserRouter>
          <Routes>
            <Route
              path="/daily-set/"
              element={<DailyPuzzle time={time} onClick={advanceTime} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
