import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Square } from '../../types/Square';
import { Mode } from '../../types/Mode';

interface gameState {
  selectedMode: Mode | null;
  isGameStarted: boolean;
  isGameEnded: boolean;
  hoveredSquares: Square[];
}

const initialState: gameState = {
  selectedMode: null,
  isGameStarted: false,
  isGameEnded: true,
  hoveredSquares: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedMode: (state, action: PayloadAction<Mode | null>) => {
      state.selectedMode = action.payload;
    },

    setIsGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload;
    },

    setIsGameEnded: (state, action: PayloadAction<boolean>) => {
      state.isGameEnded = action.payload;
    },

    resetHoveredSquares: (state) => {
      state.hoveredSquares = [];
    },

    hoverSquare: (state, action: PayloadAction<Square>) => {
      state.hoveredSquares.push(action.payload);
    },

    unhoverSquare: (state, action: PayloadAction<number>) => {
      state.hoveredSquares = state.hoveredSquares.filter(
        (square) => square.id !== action.payload,
      );
    },
  },
});

export const {
  setSelectedMode,
  setIsGameStarted,
  setIsGameEnded,
  resetHoveredSquares,
  hoverSquare,
  unhoverSquare,
} = gameSlice.actions;

export default gameSlice.reducer;
