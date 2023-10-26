import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material';
import { ColorModeContext, tokens } from '../theme';
import { useTheme } from '@mui/material/styles';


export const ProgressIndicator = ({ open }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const ColorMode = React.useContext(ColorModeContext);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!open}
        >
            <CircularProgress />
        </Backdrop>
    )
}
