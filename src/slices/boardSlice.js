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
    // Add 'size' cards to the slice
    populateBoardCards: (state, action) => {
      let boardSize = action.payload.size;
      let cardColors = [];
      let newCards = [];

      // Randomly choose colors and add to cardColors
      for (let i = 0; i < boardSize / 2; i++) {
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
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
      state.cards = newCards;
    },
  },
});

export const { flipCards, addChoiceToPair, clearChoices, matchPairOfCards, populateBoardCards } = boardSlice.actions;

export default boardSlice.reducer;