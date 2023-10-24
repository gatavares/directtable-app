import { useTheme } from '@mui/material/styles';
import { ColorModeContext, tokens } from '../theme';
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Calendar from './erc/Calendar';

function ERC() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);

  return (
    <>
      <Box marginTop={'70px'} sx={{ backgroundColor: colors.fundo[500] }}>
        <Calendar />
      </Box>
    </>
  )
}

export default ERC