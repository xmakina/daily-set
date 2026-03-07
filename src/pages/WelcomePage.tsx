import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <NavLink to="/daily">Daily Puzzle</NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
