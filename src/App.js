import './css/App.css';
import Board from './components/Board';
import Gameover from './components/YouWin';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from './components/Home';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const { cards } = useSelector(state => state.board);


  return (
      <div className='app-container'>
        <Home />
      </div>
  );
}

export default App;
