import { createSlice } from "@reduxjs/toolkit"

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    cards: [
      {
        value: "#4491fd",
        flipped: false,
        matched: false,
      },
      {
        value: "red",
        flipped: false,
        matched: false,
      },
      {
        value: "red",
        flipped: false,
        matched: false,
      },
      {
        value: "#4491fd",
        flipped: false,
        matched: false,
      },
    ],
    choicePair: [],
    isGameOver: false,
    triesCount: 0,
  },
  reducers: {
    // Flip cards based on indexes provided in array
    flipCards: (state, action) => {
        action.payload.indexes.forEach(index => {
          state.cards[index].flipped = !state.cards[index].flipped;
        });
    },
    // Add card to turnChoices
    addChoiceToPair: (state, action) => {
      state.choicePair.push(action.payload.choice);
    },
    // Clear turnChoices
    clearChoices: (state) => {
      state.choicePair = [];
    },
    // Change a matched pair of cards to matched
    matchPairOfCards: (state, action) => {
      action.payload.indexes.forEach(index => {
        state.cards[index].matched = true;
      });
    },
    // Clear the board cards
    clearBoardCards: (state, action) => {
      state.cards = [];
    },
    // Add 'size' cards to the slice
    populateBoardCards: (state, action) => {
      state.isGameOver = false;
      let newCards = [];
      const localStorageCards = JSON.parse(localStorage.getItem("currentCards"));

      // Check if the cards are already saved in localStorage
      if (localStorageCards && localStorageCards.length > 0) {
        newCards = localStorageCards;
      } else {
        // Generate them if not
        let boardSize = action.payload.size;
        let cardColors = [];
  
        // Randomly choose colors and add to cardColors
        for (let i = 0; i < boardSize / 2; i++) {
          let color = ``;
          
          do {
            color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
          } while (color === `#FFFFFF` || cardColors.map((obj) => obj.color).includes(color))

          cardColors.push({
            'color': color,
            'count': 0,
          });
        }
  
        // Randomly populate newCards with board cards
        while (newCards.length < boardSize) {
          let randomIndex = Math.floor(Math.random() * cardColors.length);
  
          if (cardColors[randomIndex].count < 2) {
            cardColors[randomIndex].count += 1;
            newCards.push({
              value: cardColors[randomIndex].color,
              flipped: false,
              matched: false,
            });
          }
        }

        localStorage.setItem("currentCards", JSON.stringify(newCards));
      }

      state.cards = newCards;
    },
    // Check to see if the cards selected match
    checkForMatch: (state, action) => {
      const { firstChoice, secondChoice } = action.payload;
      const { cards } = state;

      if (cards[firstChoice].value === cards[secondChoice].value) {
        boardSlice.caseReducers.matchPairOfCards(state, { payload: { indexes: [firstChoice, secondChoice] }});
        boardSlice.caseReducers.checkIfGameOver(state);
      }
      boardSlice.caseReducers.clearBoardChoices(state, { payload: { indexes: [firstChoice, secondChoice] }});
      state.triesCount += 1;
    },
    // Clear the current choices off the baord
    clearBoardChoices: (state, action) => {
      const { indexes } = action.payload;

      boardSlice.caseReducers.flipCards(state, { payload: { indexes: indexes }});
      boardSlice.caseReducers.clearChoices(state);
    },
    // Check to see if the game is over
    checkIfGameOver: (state, action) => {
      let matchedBools = state.cards.map(card => card.matched);
      if (matchedBools.every((bool) => bool)) {
        state.isGameOver = true;
        localStorage.setItem("currentCards", "[]");
      }
    },
  },
});


export const { 
  flipCards, 
  addChoiceToPair, 
  clearChoices, 
  matchPairOfCards, 
  clearBoardCards, 
  populateBoardCards, 
  checkForMatch, 
  clearBoardChoices,
  checkIfGameOver
} = boardSlice.actions;

export default boardSlice.reducer;