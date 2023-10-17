import React from 'react';
import { List, useTheme } from '@mui/material';
import { Square } from '../Square';
import { useTypedSelector } from '../../redux/hooks';
import { selectMode } from '../../redux/selectors/gameSelector';

export const PlayField: React.FC = () => {
  const theme = useTheme();
  const fieldSize = useTypedSelector(selectMode)?.field || 5;
  const squaresCount = fieldSize * fieldSize;

  const squares = Array.from({ length: squaresCount }, (_, index) => {
    const row = Math.floor(index / fieldSize);
    const column = index % fieldSize;

    return <Square key={index} id={index + 1} row={row} column={column} />;
  });

  return (
    <List
      sx={{
        padding: '0',

        height: '500px',
        width: '500px',
        display: 'grid',
        gridTemplateColumns: () => `repeat(${fieldSize}, 1fr)`,
        border: `1px solid ${theme.palette.secondary.main}`,

        [theme.breakpoints.down('sm')]: {
          margin: '0 auto',
          height: '400px',
          width: '400px',
        },

        [theme.breakpoints.down('xs')]: {
          height: '300px',
          width: '300px',
        },
      }}
    >
      {squares}
    </List>
  );
};
