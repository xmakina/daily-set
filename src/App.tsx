import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DailyPuzzle from "./pages/DailyPuzzle";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(new Date(Date.now()).setHours(0, 0, 0, 0));

  const advanceTime = (forward: boolean) => {
    const advance = 1000 * 60 * 60 * 24 * (forward ? 1 : -1);
    setTime(new Date(time + advance).getTime());
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/daily-set/"
          element={<DailyPuzzle time={time} onClick={advanceTime} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
