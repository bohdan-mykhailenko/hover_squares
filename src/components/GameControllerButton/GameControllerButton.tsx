import React from 'react';
import { Button, useTheme } from '@mui/material';
import {
  selectHoveredSquares,
  selectIsGameStarted,
  selectMode,
} from '../../redux/selectors/gameSelector';
import { useTypedDispatch, useTypedSelector } from '../../redux/hooks';
import {
  resetHoveredSquares,
  setIsGameStarted,
} from '../../redux/features/gameSlice';
import {
  setAlertMessage,
  setIsAlertOppened,
} from '../../redux/features/alertSlice';
import { selectIsAlertOpenned } from '../../redux/selectors/alertSelector';

export const GameControllerButton: React.FC = () => {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const selectedMode = useTypedSelector(selectMode);
  const isGameStarted = useTypedSelector(selectIsGameStarted);
  const hoveredSquares = useTypedSelector(selectHoveredSquares);
  const isAlertOpenned = useTypedSelector(selectIsAlertOpenned);

  const isModeSelected = selectedMode !== null;

  const handleButtonClick = () => {
    if (!isModeSelected) {
      const infoMessage = {
        title: 'Game rules',
        text: 'Pick game mode before starting the game!',
        severity: 'info',
      };

      dispatch(setIsAlertOppened(true));
      dispatch(setAlertMessage(infoMessage));

      return;
    }

    if (isGameStarted) {
      const fieldSize = (selectedMode?.field || 0) ** 2;

      const isGameCompleted = hoveredSquares.length === fieldSize;

      if (isGameCompleted) {
        const winningMessage = {
          title: 'Victory',
          text: 'You are the winner! Good job!!!',
          severity: 'success',
        };

        dispatch(setIsAlertOppened(true));
        dispatch(setAlertMessage(winningMessage));
      }

      dispatch(setIsGameStarted(false));

      return;
    }

    if (hoveredSquares.length > 0) {
      dispatch(resetHoveredSquares());
    }

    if (isAlertOpenned) {
      dispatch(setIsAlertOppened(false));
    }

    dispatch(setIsGameStarted(true));
  };

  return (
    <Button
      variant="contained"
      onClick={handleButtonClick}
      sx={{
        height: '50px',
        width: '150px',
        fontSize: '16px',

        [theme.breakpoints.down('sm')]: {
          width: '100px',
        },

        [theme.breakpoints.down('xs')]: {
          height: '35px',
          width: '50px',
          fontSize: '14px',
        },
      }}
    >
      {isGameStarted ? 'Finish' : 'Start'}
    </Button>
  );
};
