import "../css/Home.css";
import { useDispatch } from 'react-redux';
import { populateBoardCards } from '../slices/boardSlice';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardSizeCounts = {
    "small": 12,
    "medium": 24,
    "large": 36,
  };

  function handleSizeSelection(size) {
    dispatch(populateBoardCards({ size: boardSizeCounts[size] }));
    navigate("/board");
  }

  return (
    <div className="home-container">
      <div>
        <h1>Card Matcher</h1>
      </div>
      <div className="board-size-container">
        I'm a placeholder for the board size graphics!
      </div>
      <div className="button-container">
        <button onClick={() => handleSizeSelection("small")} >Small</button>
        <button onClick={() => handleSizeSelection("medium")} >Medium</button>
        <button onClick={() => handleSizeSelection("large")} >Large</button>
      </div>
    </div>
  )
};

export default Home;