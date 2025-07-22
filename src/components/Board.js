import { useDispatch, useSelector } from 'react-redux';
import { flipCards, addChoiceToPair, checkForMatch } from '../slices/boardSlice';
import Card from './Card';
import YouWin from './YouWin';
import '../css/Board.css';
import { useEffect, useState } from 'react';
import { populateBoardCards } from '../slices/boardSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
  const { cards, choicePair, isGameOver, triesCount } = useSelector(state => state.board);
  const [paused, setPaused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    dispatch(populateBoardCards({ size: state.boardSize }));
  }, []);

  useEffect(() => {
    if (choicePair.length === 2) {
      setPaused(true);
      setTimeout(() => {
        setPaused(false);
        dispatch(checkForMatch({ firstChoice: choicePair[0], secondChoice: choicePair[1] }));
      }, 750);
    }
  }, [choicePair]);
  
  const handleFlip = (flipped, matched, currentChoiceIndex) => {
    if (!paused && !flipped && !matched) {
      dispatch(addChoiceToPair({ choice: currentChoiceIndex }));
      dispatch(flipCards({ indexes: [currentChoiceIndex] }));
    }
  }

  function handleQuit() {
    navigate("/");
  }


  return (
    <div className='board-container'>
      {console.log("cards", cards)}
      {
        isGameOver ? 
        <YouWin /> :
        cards.map(({ value, flipped, matched }, index) => {
          return (
            <Card 
              value={value}
              flipped={flipped}
              matched={matched}
              index={index}
              handleFlip={handleFlip}
              key={index + Math.random()}
            />
          );
        })
      }
      <p>Tries: { triesCount }</p>
      <button onClick={handleQuit} >{ isGameOver ? "Go Home" : "Quit" }</button>
    </div>
  );
};

export default Board;