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
              <Route path='/horario' />
              <Route path='/horario' />
              <Route path='/escola' />
              <Route path='/gestao' />
              <Route path='/faq' />
              <Route path='/suporte' />
              <Route path='/entrar' />
            </Routes>
          </Router>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
