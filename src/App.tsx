import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DailyPuzzle from "./pages/DailyPuzzle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/daily-set/"
          element={<DailyPuzzle date={new Date(Date.now())} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
