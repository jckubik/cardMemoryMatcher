import { useDispatch, useSelector } from 'react-redux';
import { flipCards, addChoiceToPair, clearChoices, matchPairOfCards } from '../slices/boardSlice';
import Card from './Card';
import YouWin from './YouWin';
import '../css/Board.css';
import { useEffect, useState } from 'react';

const Board = () => {

  const { cards, choicePair } = useSelector(state => state.board);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("choice pair updated", choicePair);
    if (choicePair.length === 2) {
      setPaused(true);
      setTimeout(() => {
        setPaused(false);
        checkForMatch(choicePair[0], choicePair[1]);
      }, 750);
    }
  }, [choicePair]);

  useEffect(() => {
    checkIfGameOver();
  }, [cards]);

  function checkIfGameOver() {
    let matchedBools = cards.map(card => card.matched);
    console.log(matchedBools);
    if (matchedBools.every((bool) => bool)) {
      setGameOver(true);
    }
  }
  
  function flipCardsAtIndex(cardIndexes) {
    dispatch(flipCards({ indexes: cardIndexes }));
  }
  
  function clearBoard(indexes) {
    flipCardsAtIndex(indexes);
    dispatch(clearChoices());
  }

  
  function checkForMatch(firstChoice, secondChoice) {
    if (cards[firstChoice].value === cards[secondChoice].value) {
      dispatch(matchPairOfCards({ indexes: [firstChoice, secondChoice] }));
      console.log(`${cards[firstChoice].value} pair matched!`);
    }
    clearBoard([firstChoice, secondChoice]);
    console.log("firstChoice", firstChoice, "secondChoice", secondChoice);
  }
  
  const handleFlip = (flipped, matched, currentChoiceIndex) => {
    if (!paused && !flipped && !matched) {
      dispatch(addChoiceToPair({ choice: currentChoiceIndex }));
      flipCardsAtIndex([currentChoiceIndex]);
      console.log("currentChoiceIndex", currentChoiceIndex);
    }
  }


  return (
    <div className='board-container'>
      {
        gameOver ? 
        <YouWin /> :
        cards.map(({ value, flipped, matched }, index) => {
          return (
            <Card 
              value={value}
              flipped={flipped}
              matched={matched}
              index={index}
              handleFlip={handleFlip}
            />
          );
        })
      }
    </div>
  );
};

export default Board;