import React from 'react';
import { ListItemButton, useTheme } from '@mui/material';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import { hoverSquare, unhoverSquare } from '../../redux/features/gameSlice';
import {
  selectHoveredSquares,
  selectIsGameStarted,
  selectMode,
} from '../../redux/selectors/gameSelector';

interface SquareProps {
  id: number;
  row: number;
  column: number;
}

const Square: React.FC<SquareProps> = ({ id, row, column }) => {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const hoveredSquares = useTypedSelector(selectHoveredSquares);
  const isModeSelected = useTypedSelector(selectMode) !== null;
  const isGameStarted = useTypedSelector(selectIsGameStarted);

  const isSquareActive = isModeSelected && isGameStarted;
  const isHovered = hoveredSquares.find((square) => square.id === id);

  const handleMouseEnter = () => {
    const square = {
      id,
      row,
      column,
    };

    if (isHovered) {
      dispatch(unhoverSquare(square.id));

      return;
    }

    dispatch(hoverSquare(square));
  };

  return (
    <ListItemButton
      onMouseEnter={handleMouseEnter}
      sx={{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isHovered
          ? theme.palette.primary.main
          : theme.palette.secondary.light,
        border: `1px solid ${theme.palette.secondary.main}`,
      }}
      disabled={!isSquareActive}
    />
  );
};

export default React.memo(Square);
