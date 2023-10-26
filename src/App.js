import './App.css';
import { useContext } from 'react'
import { ColorModeContext, useMode, tokens } from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Navbar from './components/sidenav';


function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const ColorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path='/directtable-app/horario' />
              <Route path='/directtable-app/horario' />
              <Route path='/directtable-app/escola' />
              <Route path='/directtable-app/gestao' />
              <Route path='/directtable-app/faq' />
              <Route path='/directtable-app/suporte' />
              <Route path='/directtable-app/entrar' />
            </Routes>
          </Router>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
